const { createPool } = require('../db');

const pool = createPool();

async function deleteUser(req, res) {
  const userId = req.params.userId;

  const deleteScheduleQuery = `DELETE FROM user_schedules WHERE user_id = ?`;
  const deleteCommentsQuery = `DELETE FROM comments WHERE user_id = ?`;
  const deleteBoardQuery = `DELETE FROM boards WHERE user_id = ?`;
  const deleteUserQuery = `DELETE FROM users WHERE user_id = ?`;

  try {
    await pool.query(deleteScheduleQuery, [userId]);
    await pool.query(deleteCommentsQuery, [userId]);
    await pool.query(deleteBoardQuery, [userId]);
    await pool.query(deleteUserQuery, [userId]);

    res.status(200).send({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Error occurred while deleting:', err);
    res.status(500).send({ message: 'Error occurred while deleting.' });
  }
}

module.exports = { deleteUser };