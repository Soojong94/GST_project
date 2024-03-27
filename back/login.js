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
const GOOGLE_LOGIN_REDIRECT_URI = 'http://localhost:3000/login/redirect';
const GOOGLE_SIGNUP_REDIRECT_URI = 'http://localhost:3000/signup/redirect';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

app.get('/', (req, res) => {
    res.send(`
        <h1>OAuth</h1>
        <a href="/login">Log in</a>
        <a href="/signup">Sign up</a>
    `);
});


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
    const sql = `SELECT user_id FROM users WHERE user_id = '${google_info.email}'`;
    connection.query(sql, function(err, result) {
        if (err) throw err;

        if (result.length > 0) {
            const user_id = result[0].user_id;

            // 세션에 구글 아이디 저장
            req.session.user_id = user_id;
            console.log(`Google ID (${user_id}) stored in session.`);
        }
        
        res.render('main');
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

    res.send("<script>alert('회원등록 완료 되었습니다.'); location.href='/'</script>");
});

app.listen(port, () => {
    console.log('server is running at 3000');});