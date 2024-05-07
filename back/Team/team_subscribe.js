const { createPool } = require('../db');

const pool = createPool();

async function subscribe(req, res) {
    const { userId, teamIdx, isSubscribed } = req.body;

    try {
        if (isSubscribed) {
            const query = 'INSERT INTO subscriptions (user_id, team_idx, created_at) VALUES (?, ?, NOW())';
            const params = [userId, teamIdx];
            await pool.query(query, params);
            res.status(200).json({ message: 'Subscription added successfully.' });
            console.log('구독완료')
        } else {
            const query = 'DELETE FROM subscriptions WHERE user_id = ? AND team_idx = ?';
            const params = [userId, teamIdx];
            await pool.query(query, params);
            res.status(200).json({ message: 'Subscription removed successfully.' });
            console.log('구독해제')
        }
    } catch (error) {
        console.error('Error occurred while subscribing:', error);
        res.status(500).json({ error });
    }
}

async function getSubscription(req, res) {
    const { user_id, team_idx } = req.body;


    const sql = `SELECT * FROM subscriptions WHERE user_id = ? AND team_idx = ?`;

    try {
        const data = await pool.query(sql, [user_id, team_idx]);
        res.json(data[0]);
    } catch (err) {
        console.error('구독 정보 받아오기 중 에러 발생', err);
        res.status(500).send('구독 정보를 받아오는중 에러가 발생하였습니다.');
    }
}

module.exports = { subscribe, getSubscription };