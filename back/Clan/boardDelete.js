const { createPool } = require('../db.js');

const pool = createPool();

async function deleteBoard(req, res) {
  const { b_idx, user_id } = req.params;
 
  const deleteCommentsQuery = `DELETE FROM comments WHERE b_idx = ? AND user_id = ?`;
  const deleteBoardQuery = `DELETE FROM boards WHERE b_idx = ? AND user_id = ?`;

  try {
    await pool.query(deleteCommentsQuery, [b_idx, user_id]);
    await pool.query(deleteBoardQuery, [b_idx, user_id]);
    res.status(200).send('게시글 삭제 성공');
  } catch (error) {
    console.error('게시글 삭제 에러:', error);
    res.status(500).send({ error: '게시글 삭제 중 에러가 발생했습니다.' });
  }
}

module.exports = { deleteBoard };