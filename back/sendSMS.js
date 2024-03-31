const aligoapi = require('aligoapi');

const AuthData = { //유저 키값
  key: 'apikey',
  user_id: 'userid'
};

function sendSMS(receiver, msg) {
  const req = {
    body: {
      sender: '01029374536',
      receiver,
      msg
    }
  };

  aligoapi.send(req, AuthData)
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.error(e);
    });
}

module.exports = sendSMS;