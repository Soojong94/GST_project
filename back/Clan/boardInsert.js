const { createPool } = require('../db');

const pool = createPool();

async function boardInsert(req, res) {
  const { title, content, userId, userCount } = req.body;
  const file = req.file ? req.file.filename : null;
  const image = file ? '/uploads/' + file : null;

  const clansInsertSql = `INSERT INTO clans (clan_boss_id, clan_limit, clan_logo, clan_name, created_at) VALUES (?, ?, ?, ?, NOW())`;
  const boardsInsertSql = `INSERT INTO boards (b_content, b_file, b_title, user_id, created_at) VALUES (?, ?, ?, ?, NOW())`;
  const clanInfoUdate = `UPDATE users SET clan_boss = 'y', clan = ? WHERE user_id = ?`;

  try {
    await pool.query(clansInsertSql, [userId, userCount, image, title]);
    await pool.query(boardsInsertSql, [content, image, title, userId]);
    await pool.query(clanInfoUdate, [title, userId]);
    res.status(200).send('Successfully inserted data');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error inserting data');
  }
}

module.exports = { boardInsert };