const { createPool } = require('../db');

const pool = createPool();

async function updateUserInfo(req, res) {
    const { user_id, user_nick, user_phone } = req.body;

    // MySQL 쿼리를 사용하여 데이터 업데이트를 수행합니다.
    const updateUserQuery = `UPDATE users SET user_nick = ?, user_phone = ? WHERE user_id = ?`;

    try {
        await pool.query(updateUserQuery, [user_nick, user_phone, user_id]);
        console.log('사용자 정보가 성공적으로 업데이트되었습니다.');
        res.send('사용자 정보가 성공적으로 업데이트되었습니다.');
    } catch (err) {
        console.error('사용자 정보 업데이트 중 오류 발생:', err);
        return res.status(500).send('사용자 정보 업데이트 중 오류가 발생했습니다.');
    }
}

module.exports = { updateUserInfo };