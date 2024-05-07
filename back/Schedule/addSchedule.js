const { createPool } = require('../db');

const pool = createPool();

async function addSchedule(req, res) {
  const { calendarType, st_dt, ed_dt, st_tm, ed_tm, sche_content, user_id } = req.body;

  try {
    if (calendarType === '1') {
      const query = 'INSERT INTO user_schedules (user_id, st_dt, ed_dt, st_tm, ed_tm, sche_content) VALUES (?, ?, ?, ?, ?, ?)';
      await pool.query(query, [user_id, st_dt, ed_dt, st_tm, ed_tm, sche_content]);
      console.log('개인일정이 성공적으로 등록되었습니다.');
      res.sendStatus(200);
    } else if (calendarType === '2') {
      const query = 'INSERT INTO clan_schedules (st_dt, ed_dt, st_tm, ed_tm, sche_content, user_id) VALUES (?, ?, ?, ?, ?, ?)';
      const result = await pool.query(query, [st_dt, ed_dt, st_tm, ed_tm, sche_content, user_id]);
      const sche_idx = result[0].insertId;
      const shareQuery = 'INSERT INTO clan_schedule_shares (sche_idx, user_id, share_id) VALUES (?, ?, ?)';
      await pool.query(shareQuery, [sche_idx, user_id, user_id]);
      console.log('클랜 일정이 성공적으로 등록되었습니다.');
      res.sendStatus(200);
    }
  } catch (err) {
    console.error('일정 등록 중 에러 발생:', err);
    res.status(500).send('서버 에러');
  }
}

module.exports = { addSchedule };