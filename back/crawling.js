const puppeteer = require('puppeteer');

const crawlData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://game.naver.com/esports/League_of_Legends/schedule/lck?date=2021-01');

    const team1 = await page.$$eval('.row_home__zbX5s>span.row_name__IDFHz', (elements) =>
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

    const score2 = await page.$$eval('.row_away__3zJEV>span.row_score__2RmGQ', (elements) =>
        elements.map((element) => element.textContent.trim())
    );

    const time = await page.$$eval('.row_time__28bwr', (elements) =>
        elements.map((element) => element.textContent.trim())
    );

    const divElements = await page.$$('div.card_item__3Covz');

    const li_list = [];
    const insert_list = [];

    for (const divElement of divElements) {
        const liCount = await divElement.$$eval('li', liElements => liElements.length);
        li_list.push(liCount);
    }

    let k = 0;
    for (let i = 0; i < divElements.length; i++) {
        for (let j = 0; j < li_list[i]; j++) {
            const obj = {'match': match[i], 'team1': team1[k], 'team2': team2[k], 'status': status[k], 'score1': score1[k], 'score2': score2[k], 'time': time[k]};
            insert_list.push(obj);
            console.log(obj);
            k++;
        }
    }

    await browser.close();
};

crawlData();