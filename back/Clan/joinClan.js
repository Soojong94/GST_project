const { createPool } = require("../db");

const pool = createPool();

async function joinClan(req, res) {
    const { clan, user_id } = req.body;

    const addUserQuery = `UPDATE users SET clan = '${clan}' WHERE user_id = '${user_id}'`;

    try {
        await pool.query(addUserQuery);
        return res.status(200).send('사용자가 성공적으로 클랜에 추가되었습니다.');
    } catch (error) {
        console.error('사용자 추가 오류:', error);
        return res.status(500).send('사용자를 클랜에 추가하는 중 오류가 발생했습니다.');
    }
}

module.exports = { joinClan };