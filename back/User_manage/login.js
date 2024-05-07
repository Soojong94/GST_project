const { createPool } = require('../db');
const bcrypt = require('bcrypt');

const pool = createPool();

async function loginUser(req, res, next) {
  const { userId, userPw } = req.body;
  try {
    const [results] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    if (results.length > 0) {
      const comparison = await bcrypt.compare(userPw, results[0].user_pw);
      if (comparison) {
        req.session.user = {
          user_id: results[0].user_id,
          user_nick: results[0].user_nick,
          joined_at: results[0].joined_at,
          clan: results[0].clan,
          clan_boss: results[0].clan_boss,
        };
        user = req.session.user;
        return res.status(200).send(user);
      } else {
        return res.status(401).send('Incorrect Password');
      }
    } else {
      return res.status(404).send('User Not Found');
    }
  } catch (error) {
    return next(error);
  }
}

function checkLogin(req, res) {
  if (req.session.user && req.session.user.user_id) {
    return res.send('User is logged in');
  } else {
    return res.send('User is not logged in');
  }
}

module.exports = { loginUser, checkLogin };