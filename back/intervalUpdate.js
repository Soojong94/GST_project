const puppeteer = require('puppeteer');
const mysqlConnection = require('./mysql');
const createJson = require('./createJson');
const update = require('./update');
const fs = require('fs');

// createJson 함수 실행 후 10분 후에 update 함수 실행
function runFunctions() {
  createJson().then(() => {
    // createJson 함수가 완료된 후 몇초 기다린 후 update 함수 실행
    setTimeout(update, 100);
  });
}

// runFunctions 함수를 10분마다 반복 실행
setInterval(runFunctions, 600000);