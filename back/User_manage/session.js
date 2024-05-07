function getSession(req, res) {
  const { user_id, user_nick, clan_boss, clan } = user;
  let sessionObj = {
    user_id: user_id,
    user_nick: user_nick,
    clan_boss: clan_boss,
    clan: clan,
  };
  res.json(sessionObj);
}

function logout(req, res) {
  req.session.user = null; // 세션 정보를 제거합니다.
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error destroying session');
    }
    return res.sendStatus(200);
  });
}

module.exports = { getSession, logout };
