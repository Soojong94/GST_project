const { createPool } = require('../db');

const pool = createPool();

async function createClan(req, res) {
    const userId = req.session.userId;
    const clanData = req.body;

    const sql = `INSERT INTO clans (clan_boss_id, clan_name, clan_limit, created_at, clan_is, clan_logo)
  VALUES ('${userId}', '${clanData.clanName}', ${clanData.clanMembers}, NOW(), 'Y', '${clanData.clanImage}')`;

    try {
        // SQL 쿼리 실행
        const results = await pool.query(sql);
        console.log('클랜 생성 성공');
        // 쿼리 결과 출력
        console.log('Insert ID:', results[0].insertId);
        res.send('클랜 생성 데이터 전송성공');
    } catch (error) {
        console.error('클랜 생성 에러:', error);
        res.status(500).send('클랜 생성에 실패했습니다.');
    }
}

module.exports = { createClan };