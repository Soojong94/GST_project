const { createPool } = require("../db");

const pool = createPool();

async function deleteSchedule(req, res) {
    const { calendarType, sche_idx, user_id, clan_boss } = req.body;

    try {
        if (calendarType === 1) {
            // 개인 일정 삭제
            await pool.query('DELETE FROM user_schedules WHERE sche_idx = ? AND user_id = ?', [sche_idx, user_id]);
        } else if (calendarType === 2 && clan_boss === 'y') {
            // 클랜 일정 삭제
            await pool.query('DELETE FROM clan_schedule_shares WHERE sche_idx = ? AND user_id = ?', [sche_idx, user_id]);
            await pool.query('DELETE FROM clan_schedules WHERE sche_idx = ? AND user_id = ?', [sche_idx, user_id]);
        }

        res.status(200).send('Schedule deleted successfully');
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).send('Error deleting schedule');
    }
}

module.exports = { deleteSchedule };
