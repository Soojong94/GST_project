const mysqlConnection = require('./mysql');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const connection = mysqlConnection.init();

const team_num = [];

const getTeamIdx = (teamName) => {
    for (let i = 0; i < team_num.length; i++) {
        if (team_num[i].team_name === teamName) {
            return team_num[i].team_idx;
        }
    }
    return null; // 팀 번호를 찾지 못한 경우 null 반환
};

async function createJson(connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT team_idx, team_name FROM teams', async (err, results) => {
            if (err) {
                console.log('데이터베이스 쿼리 실행 실패:', err);
                reject(err);
                return;
            }

            // 결과를 처리하거나 원하는 작업을 수행합니다.
            for (let i = 0; i < results.length; i++) {
                const team = results[i];
                const teamIdx = team.team_idx;
                const teamName = team.team_name;

                team_num.push({ team_name: teamName, team_idx: teamIdx });
            }

            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto('https://game.naver.com/esports/League_of_Legends/schedule/lck');


            const team1 = await page.$$eval('.row_home__zbX5s > span.row_name__IDFHz', (elements) =>

                elements.map((element) => element.textContent.trim())

            );



            const team2 = await page.$$eval('.row_away__3zJEV span.row_name__IDFHz', (elements) =>

                elements.map((element) => element.textContent.trim())

            );



            const match = await page.$$eval('.card_date__1kdC3', (elements) =>

                elements.map((element) => element.textContent.trim())

            );



            const status = await page.$$eval('.row_state__2RKDU', (elements) =>

                elements.map((element) => element.textContent.trim())

            );



            const score1 = await page.$$eval('.row_home__zbX5s span.row_score__2RmGQ', (elements) =>

                elements.map((element) => element.textContent.trim())

            );



            const score2 = await page.$$eval('.row_away__3zJEV > span.row_score__2RmGQ', (elements) =>

                elements.map((element) => element.textContent.trim())

            );



            const time = await page.$$eval('.row_time__28bwr', (elements) =>

                elements.map((element) => element.textContent.trim())

            );



            const divElements = await page.$$('div.card_item__3Covz');



            const li_list = [];

            const insert_list = [];

            const currentYear = new Date().getFullYear();



            for (const divElement of divElements) {

                const liCount = await divElement.$$eval('li', (liElements) => liElements.length);

                li_list.push(liCount);

            }



            let k = 0;

            for (let i = 0; i < divElements.length; i++) {

                for (let j = 0; j < li_list[i]; j++) {

                    const team1Name = team1[k];

                    const team2Name = team2[k];



                    const team1Idx = getTeamIdx(team1Name);

                    const team2Idx = getTeamIdx(team2Name);



                    const matchParts = match[i].split(' ');

                    const year = currentYear;

                    const month = matchParts[0].replace('월', '');

                    const day = matchParts[1].replace('일', '');

                    const machtime = time[k];



                    const formattedMatch = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${machtime}`;



                    const obj = {

                        team_1: team1Idx,

                        team_1_score: score1[k] || 0,

                        team_2: team2Idx,

                        team_2_score: score2[k] || 0,

                        matched_at: formattedMatch,

                        match_is: status[k],

                    };











                    insert_list.push(obj);



                    k++;

                }

            }




            await browser.close();

            const jsonData = JSON.stringify(insert_list, null, 2);
            fs.writeFile('update.json', jsonData, (err) => {
                if (err) {
                    console.log('JSON 파일 생성 실패:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
};
    
module.exports = createJson;