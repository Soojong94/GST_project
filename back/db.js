const mysql = require("mysql2/promise");

const createPool = () => {
  const pool = mysql.createPool({
    host: 'project-db-campus.smhrd.com',
    port: 3307,
    password: 'smhrd3',
    user: 'campus_23K_AI18_p2_3',
    database: 'campus_23K_AI18_p2_3'   
  });
  return pool;
};

module.exports = { createPool }; 
