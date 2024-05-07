const { createPool } = require('../db');

const pool = createPool();

async function getSchedule(req, res) {
    const userId = req.params.userId;

    try {
        // 개인 일정 가져오기
        const personalQuery = 'SELECT * FROM user_schedules WHERE user_Id = ?';
        const personalScheduleData = await pool.query(personalQuery, [userId]);

        // 클랜 일정 가져오기
        const clanQuery = `
            SELECT cs.* 
            FROM clan_schedules cs
            JOIN users u ON cs.user_id = u.user_id
            WHERE u.clan = (
                SELECT clan 
                FROM users 
                WHERE user_id = ?
            )
        `;
        const clanScheduleData = await pool.query(clanQuery, [userId]);

        // 구독한 팀의 경기일정 가져오기
        const subscribedMatchQuery = `
            SELECT ms.*
            FROM matches ms
            JOIN subscriptions s ON ms.team_1 = s.team_idx OR ms.team_2 = s.team_idx 
            WHERE s.user_id =  ?
        `;
        const subscribedMatchScheduleData = await pool.query(subscribedMatchQuery, [userId]);

        // 모든 일정 데이터를 JSON 형태로 응답
        res.json({
            personal: personalScheduleData[0],
            clan: clanScheduleData[0],
            subscribedMatch: subscribedMatchScheduleData[0]
        });
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).send('Error fetching schedules');
    }
}

module.exports = { getSchedule };