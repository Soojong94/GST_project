const puppeteer = require('puppeteer');
const mysqlConnection = require('./mysql');
const createJson = require('./createJson');
const update = require('./update');
const fs = require('fs');
async function runFunctions() {
      const connection = mysqlConnection.init();
      mysqlConnection.open(connection);
    
      try {
        await createJson(connection);
        await update(connection);
      } catch (err) {
        console.error('Error running functions:', err);
      } finally {
        connection.end();
      }
    }
    
    setInterval(runFunctions, 600000);