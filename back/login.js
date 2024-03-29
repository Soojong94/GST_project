/* eslint-disable no-unused-expressions */
const express = require('express');
const axios = require('axios');
const session = require('express-session');//세션
const ejs = require('ejs') // npm install ejs _ 주소를 파일단위로 관리하고, 랜더링하기 위한 라이브러리 _ express에서 사용할 수 있는
const bodyParser = require('body-parser')
const mysqlConnection = require('./mysql')
const cors = require('cors'); // cor 패키지
const http = require('http') // cor와 함께 사용할 아이
const app = express();
const port = 5000;
const multer = require('multer');




app.use(cors());
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
}));

const connection = mysqlConnection.init();
mysqlConnection.open(connection);

app.set('view engine', 'ejs'); // 보여주는 싯기를 ejs쓸거야 명시
app.set('views', './views'); // views 라는 애들은, ./views 안에 있어
app.use(bodyParser.urlencoded({extended:false}));

const GOOGLE_CLIENT_ID = ''; // YOUR GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = '' // YOUR GOOGLE_CLIENT_SECRET;
const GOOGLE_LOGIN_REDIRECT_URI = 'http://localhost:5000/login/redirect';
const GOOGLE_SIGNUP_REDIRECT_URI = 'http://localhost:5000/signup/redirect';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';



app.get('/login', (req, res) => {
    let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    url += `?client_id=${GOOGLE_CLIENT_ID}`
    url += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URI}`
    url += '&response_type=code'
    url += '&scope=email profile'    
    res.redirect(url);
});

app.get('/signup', (req, res) => {
    let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    url += `?client_id=${GOOGLE_CLIENT_ID}`
    url += `&redirect_uri=${GOOGLE_SIGNUP_REDIRECT_URI}`
    url += '&response_type=code'
    url += '&scope=email profile'    
    res.redirect(url);
});


app.get('/login/redirect', async (req, res) => {
    const { code } = req.query;

    const resp = await axios.post(GOOGLE_TOKEN_URL, {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_LOGIN_REDIRECT_URI,
        grant_type: 'authorization_code',
    });

    const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${resp.data.access_token}`,
        },
    });

    const google_info = resp2.data;

    console.log(google_info);
    req.session.google_id = google_info.email; // 세션에 구글 아이디 저장

    // 디비에서 코드값과 일치하는 구글 아이디를 조회하는 쿼리 실행
    const sql = `SELECT user_id, user_nick FROM users WHERE user_id = '${google_info.email}'`;
    connection.query(sql, function(err, result) {
        if (err) throw err;

        if (result.length > 0) {
            const user_id = result[0].user_id;
            const user_nick = result[0].user_nick;

            // 세션에 구글 아이디 저장
            req.session.user_id = user_id;
            req.session.user_nick = user_nick;
            console.log(`Google ID (${user_id}) and nickname (${user_nick}) stored in session.`);
        }
        
        res.send("<script>alert('로그인 성공'); location.href='http://localhost:3000'</script>");
    });
});


app.get('/signup/redirect', async (req, res) => {
    const { code } = req.query;

    const resp = await axios.post(GOOGLE_TOKEN_URL, {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_SIGNUP_REDIRECT_URI,
        grant_type: 'authorization_code',
    });

    const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${resp.data.access_token}`,
        },
    });

    const google_info = resp2.data;

    console.log(google_info);
    req.session.email = google_info.email; // 세션에 이메일 주소 저장
    

    res.render('npForm');
});

app.post('/first/login.js', (req, res) => {
    const email = req.session.email; // 세션에서 이메일 주소 추출
    const { nick, phone } = req.body;
    
    const sql = `INSERT INTO users (user_id, user_nick, user_phone, joined_at) VALUES ('${email}', '${nick}', '${phone}', NOW())`;
    connection.query(sql, function(err, result){
        if(err) throw err;
        console.log('자료 1개를 반환하였습니다.'); 
    });

    mysqlConnection.close;

    res.send("<script>alert('회원등록 완료 되었습니다.'); location.href='http://localhost:3000?'</script>");
});

// 세션 리액트로 전송
// app.get('/session', (req, res) => {
//     if (req.session.user_id && req.session.user_nick) {
//       res.json({ user_id: req.session.user_id, user_nick: req.session.user_nick });
//     } else {
//       res.json(null);
//     }
//   });

// 파일 저장을 위한 multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // 파일이 저장될 경로
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // '/api/boardInsert' 경로에 대한 POST 요청 처리
  app.post('/api/boardInsert', upload.single('file'), (req, res) => {
    const nick = req.session.user_nick; // 세션에서 사용자 닉네임 가져오기 (사용자 인증 구현 필요)
    const user_id = req.body.user_id; // 사용자 ID 처리 (사용자 인증 구현 필요)
    const b_title = req.body.title;
    const b_content = req.body.content;
    const b_file = req.file ? req.file.path : ''; // 파일이 있다면 파일 경로 저장
    const b_created_at = new Date();
  
    // 데이터베이스 연결 및 쿼리 실행 코드 (여기서는 예시로만 표시)
    const sql = `INSERT INTO boards (b_title, b_content, b_file, created_at, user_id) 
                 VALUES (?, ?, ?, ?, ?)`;
    const values = [b_title, b_content, b_file, b_created_at, user_id];
  
    // 데이터베이스 쿼리 실행 (예시 코드)
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting data');
      } else {
        console.log('Data inserted successfully');
        res.sendStatus(200);
      }
    });
  });
  
  // 서버 실행
 

app.listen(port, () => {
    console.log('server is running at 5000');});