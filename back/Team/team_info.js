const { createPool } = require('../db');

const pool = createPool();

async function getTeams(req, res) {
    const sql = "SELECT * FROM teams WHERE team_idx <= 10";

    try {
        const data = await pool.query(sql);
        res.json(data[0]);
    } catch (err) {
        console.error('Error occurred while getting teams:', err);
        res.status(500).json(err);
    }
}

async function getTeamInfo(req, res) {
    const idx = req.params.team_idx;
    const sql = `SELECT * FROM teams WHERE team_idx = ?`;

    try {
        const data = await pool.query(sql, [idx]);
        res.json(data[0]);
    } catch (err) {
        console.error('Error occurred while getting team info:', err);
        res.status(500).json(err);
    }
}

module.exports = { getTeams, getTeamInfo };