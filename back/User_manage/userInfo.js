const { createPool } = require('../db');

const pool = createPool()

async function getUserInfo(req, res) {
  const userId = req.body.user_id;
  const sql = `SELECT * FROM users WHERE user_id = ?`;

  try {
    const [rows, fields] = await pool.query(sql, [userId]);
    res.json(rows[0]);
  } catch (error) {
    console.error('사용자 정보 가져오기 중 오류 발생:', error);
    res.status(500).send('사용자 정보 가져오기 중 오류가 발생했습니다.');
  }
}

module.exports = {
  getUserInfo
};