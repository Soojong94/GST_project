const puppeteer = require('puppeteer');
const { createPool } = require('../db');
const createJson = require('./createJson');
const update = require('./update');
const fs = require('fs');

const pool = createPool();

async function intervalUpdate() {
    try {
        await createJson(pool);
        await update(pool);
    } catch (err) {
        console.error('Error running functions:', err);
    }
}

setInterval(intervalUpdate, 600000);