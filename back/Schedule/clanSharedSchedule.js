const { createPool } = require('../db');

const pool = createPool();

async function getSharedSchedules(req, res) {
  const userId = req.params.userId;
  
  try {
    const sql = `
      SELECT cs.* 
      FROM clan_schedules cs
      JOIN users u ON cs.user_id = u.user_id
      WHERE u.clan = (
          SELECT clan 
          FROM users 
          WHERE user_id = ?
      )
      `;
    const data = await pool.query(sql, [userId]);
    return res.json(data[0]);
  } catch (err) {
    console.error('An error occurred:', err);
    return res.status(500).send('Error occurred while fetching shared schedules');
  }
}

module.exports = { getSharedSchedules };