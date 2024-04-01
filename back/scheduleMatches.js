// const schedule = require('node-schedule');
// const mysqlConnection = require('./mysql')
// const sendSMS = require('./sendSMS');

// const db = mysqlConnection.init();
// mysqlConnection.open(db);

// function scheduleMatches() {
//   const query = `
//     SELECT s.user_id, u.user_phone, m.matched_at, t1.team_name as team_1_name, t2.team_name as team_2_name
//     FROM subscriptions s
//     JOIN users u ON s.user_id = u.user_id
//     JOIN matches m ON s.team_idx = m.team_1 OR s.team_idx = m.team_2
//     JOIN teams t1 ON m.team_1 = t1.team_idx
//     JOIN teams t2 ON m.team_2 = t2.team_idx
//   `;

//   db.query(query, (error, results) => {
//     if (error) throw error;

//     results.forEach(row => {
//       const matchDate = new Date(row.matched_at);
//       matchDate.setMinutes(matchDate.getMinutes() - 5);

//       const job = schedule.scheduleJob(matchDate, () => {
//         const msg = `${row.team_1_name} vs ${row.team_2_name} 경기가 5분 후에 시작됩니다. 경기 일정: ${row.matched_at}`;
//         sendSMS(row.user_phone, msg);
//       });

//       console.log(`Scheduled a job for user ${row.user_id} at ${matchDate}`);
//     });
//   });
// }

// module.exports = scheduleMatches;