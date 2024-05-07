const { createPool } = require('../db');

const pool = createPool();

async function getBoardList(req, res) {
  const q = 'SELECT * FROM boards ORDER BY b_idx DESC';
  try {
    const data = await pool.query(q);
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function getBoard(req, res) {
  const idx = req.params.idx;

  const sql = `SELECT b.*, u.user_nick FROM boards b INNER JOIN users u ON b.user_id = u.user_id WHERE b.b_idx = ?`;

  try {
    const data = await pool.query(sql, idx);
    return res.json(data[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = { getBoardList, getBoard };