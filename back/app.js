const express = require('express');
const {applyRoutes} = require('./routes.js');
const {applyMiddlewares} = require('./middleware.js')
const port = 5000;
const app = express();

const upload = applyMiddlewares(app);
applyRoutes(app, upload); // 라우팅 적용

app.listen(port, () => {
    //scheduleMatches(); 문자서비스
    //intervalUpdate(); 자동크롤링
});
