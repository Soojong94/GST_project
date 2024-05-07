const { createPool } = require("../db");

const pool = createPool();

async function getClanMembers(req, res) {
  const userId = req.body.user_id;
  const sql = 
  `SELECT user_nick
  FROM users
  WHERE clan = (SELECT clan FROM users WHERE user_id = ?) AND clan_boss = 'n';`;
  try {
    const result = await pool.query(sql, [userId]);
    res.json(result[0]);
  } catch (err) {
    console.error('클랜 멤버 가져오기 중 오류 발생:', err);
    return res.status(500).send('클랜 멤버 가져오기 중 오류가 발생했습니다.');
  }
}


async function deleteClanMember(req, res) {
  const user_nick = req.params.userNick;
  const sql = `UPDATE users SET clan = NULL WHERE user_nick = '${user_nick}'`;
  try {
    await pool.query(sql);
    res.status(200).send({ message: '클랜 멤버 탈퇴 성공' })
  } catch (err) {
    console.log('클랜 멤버 탈퇴 오류', err);
    return res.status(500).send('클랜 멤버를 탈퇴하는 중 오류가 발생하였습니다')
  }
}

module.exports = { getClanMembers, deleteClanMember };