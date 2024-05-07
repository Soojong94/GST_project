const { createPool } = require("../db");

const pool = createPool();

async function Mypagesubscription(req, res) {
    const userId = req.params.userId;

    if (!userId) {
        res.status(401).send('Unauthorized');
        return;
    }

    const query = `SELECT teams.team_name FROM subscriptions INNER JOIN teams ON subscriptions.team_idx = teams.team_idx WHERE subscriptions.user_id = ?`;

    try {
        const results = await pool.query(query, [userId]);
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching user subscriptions:', error);
        res.status(500).send('Error fetching user subscriptions');
    }
}

module.exports = { Mypagesubscription };