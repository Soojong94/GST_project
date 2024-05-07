const { createPool } = require('../db');

const pool = createPool();

async function deleteClan(req, res) {
    const boss_id = req.params.userId;

    try {
        // 클랜 삭제를 위한 SQL 문
        const deleteCommentsQuery = `DELETE FROM comments WHERE user_id = '${boss_id}'`;
        const deleteBoardQuery = `DELETE FROM boards WHERE user_id = '${boss_id}'`;
        
        await pool.query(deleteCommentsQuery);
        await pool.query(deleteBoardQuery);

        // 클랜에 속한 사용자들의 clan 컬럼을 null로 업데이트
        const updateUsersQuery = `UPDATE users SET clan = NULL WHERE clan = (SELECT clan_name FROM clans WHERE clan_boss_id = '${boss_id}')`;

        await pool.query(updateUsersQuery);

        // 클랜장의 보스 여부 변경
        const updateclanbossQuery = `UPDATE users SET clan_boss = 'n' WHERE user_id ='${boss_id}'`;
        await pool.query(updateclanbossQuery);

        // 클랜 삭제를 위한 SQL 문
        const deleteClanQuery = `DELETE FROM clans WHERE clan_boss_id = '${boss_id}'`;
        await pool.query(deleteClanQuery);

        res.status(200).send({ message: 'Clan deleted successfully.' });
    } catch (error) {
        console.error('Error occurred while deleting clan:', error);
        res.status(500).send({ message: 'Error occurred while deleting clan.' });
    }
}

module.exports = { deleteClan };