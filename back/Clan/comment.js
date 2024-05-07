const { createPool } = require('../db');

const pool = createPool();

// 댓글 작성 기능
async function commentInsert(req, res) {
    const { b_idx, user_id, cmt_content } = req.body;
    const created_at = new Date().toISOString(); // 댓글 작성 시간 생성

    // Construct comment data
    const newComment = {
        b_idx,
        user_id,
        cmt_content,
        created_at,
    };

    try {
        // Store the new comment in the database
        await pool.query(
            'INSERT INTO comments(b_idx, user_id, cmt_content, created_at) VALUES (?, ?, ?, ?)',
            [newComment.b_idx, newComment.user_id, newComment.cmt_content, newComment.created_at]
        );

        res.status(200).send('댓글이 성공적으로 등록되었습니다.');
    } catch (error) {
        console.error('댓글 등록 중 에러가 발생했습니다', error);
        res.status(500).send('댓글 등록에 실패했습니다.');
    }
}

async function getComment(req, res) {
    const { idx } = req.params;

    const sql = `SELECT c.*, u.user_nick FROM comments c INNER JOIN users u ON c.user_id = u.user_id WHERE c.b_idx = ? ORDER BY c.cmt_idx DESC`;

    try {
        const data = await pool.query(sql,[idx]);
        return res.json(data[0]);
    } catch (error) {
        console.error('댓글 조회 중 에러가 발생했습니다', error);
        return res.status(500).send('댓글 조회에 실패했습니다.');
    }
}

module.exports = { commentInsert, getComment };