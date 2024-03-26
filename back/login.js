const express = require('express');
const axios = require('axios');
const ejs = require('ejs') // npm install ejs _ 주소를 파일단위로 관리하고, 랜더링하기 위한 라이브러리 _ express에서 사용할 수 있는
const bodyParser = require('body-parser')
const mysqlConnection = require('./mysql')
const app = express();
const port = 3000;

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

let google_info = [];
let user_info = [];

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


app.get('/login/redirect', (req, res) => {
    const { code } = req.query;
    console.log(`code: ${code}`);
    console.log('ok');
    res.render('main')

});

app.get('/signup/redirect', async (req, res) => {
    const { code } = req.query;
    console.log(`code: ${code}`);

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
    console.log(resp2.data);
    res.render('npForm')
});

// 라우터 정의
app.post('/first/login.js', (req, res) => {
    // POST 요청에서 전송된 데이터 추출
    const nick = req.body.nick;
    const phone = req.body.phone;
  
    // 데이터 활용 및 로직 수행
    console.log(`nick : ${nick}`);
    console.log(`phone : ${phone}`);
    // 응답 반환
    res.send("<script>alert('문의사항이 등록 되었습니다.'); location.href='/'</script>");
  });

app.listen(port, () => {
    console.log('server is running at 3000');
});