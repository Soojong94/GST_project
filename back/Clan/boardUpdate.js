const { createPool } = require("../db");

const pool = createPool();

async function updateBoard(req, res) {
    const b_idx = req.params.b_idx;
    const { user_id, title, content } = req.body;

    const sql = `UPDATE boards SET b_content = ?, b_title = ? WHERE b_idx = ? AND user_id = ?`;

    try {
        const result = await pool.query(sql, [content, title, b_idx, user_id]);

        if (result.affectedRows === 0) {
            console.log('보드 수정 실패: 해당하는 게시물이 없거나 권한이 없습니다.');
            res.status(404).send('해당하는 게시물이 없거나 권한이 없습니다.');
            return;
        }

        console.log('보드 수정 성공');
        res.status(200).send('board Update successfully');
    } catch (error) {
        console.error('보드 수정 에러:', error);
        res.status(500).send('보드 수정 에러');
    }
}

module.exports = { updateBoard };