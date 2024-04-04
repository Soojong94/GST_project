const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysqlConnection = require('./mysql');
const cors = require('cors');
const app = express();
const port = 5000;
const multer = require('multer');
const bcrypt = require('bcrypt');
const util = require('util');
const axios = require('axios')
const path = require('path');
const { log } = require('console');

// MySQL 연결 초기화 및 오픈
const connection = mysqlConnection.init();
connection.query = util.promisify(connection.query); // Enable async/await for MySQL queries

// CORS 미들웨어 등록
// 서버에서 CORS 설정하기
app.use(
  cors({
    origin: 'http://localhost:3000', // 허용할 도메인
    credentials: true, // 쿠키를 주고받을 수 있도록 설정
  })
);

// 클라이언트에서 쿠키를 이용하여 서버에 요청 보내기
axios.defaults.withCredentials = true;

// Setup session middleware
app.use(session({
  secret: '121212',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));

// 회원가입

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Error handling middleware

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});
// Handle duplicate error functionn
const handleDuplicateError = (results, user_id, user_nick, next) => {
  if (results[0].user_id === user_id) {
    return next(new Error('Duplicate ID'));
  } else if (results[0].user_nick === user_nick) {
    return next(new Error('Duplicate Nickname'));
  }
};

// Endpoint for user registration
app.post('/signup', async (req, res, next) => {
  const { user_id, user_nick, user_phone, user_pw } = req.body;
  const hashedPassword = await bcrypt.hash(user_pw, 10);

  try {
    const results = await connection.query('SELECT * FROM users WHERE user_id = ? OR user_nick = ?', [user_id, user_nick]);

    if (results.length > 0) {
      return handleDuplicateError(results, user_id, user_nick, next);
    } else {
      // Insert the new user into the database
      const newUser = {
        user_id,
        user_nick,
        user_phone,
        user_pw: hashedPassword,
        joined_at: new Date(),
        // Assume clan is defined somewhere or retrieved from request
        clan: null,
      };
      await connection.query('INSERT INTO users SET ?', newUser);

      // Save user data in session
      req.session.user = {
        user_id: newUser.user_id,
        user_nick: newUser.user_nick,
        joined_at: newUser.joined_at,
        clan: newUser.clan,
      };
      res.status(200).json({ message: 'Signup Successful' });
    }
  } catch (error) {
    return next(error);
  }
});


let user = {};

// Endpoint for user login
app.post('/login', async (req, res, next) => {
  const { userId, userPw } = req.body;
  connection.query('SELECT * FROM users WHERE user_id = ?', [userId], async (error, results) => {

    if (error) return next(error);
    if (results.length > 0) {
      const comparison = await bcrypt.compare(userPw, results[0].user_pw);
      if (comparison) {
        // Save user data in session
        req.session.user = {
          user_id: results[0].user_id,
          user_nick: results[0].user_nick,
          joined_at: results[0].joined_at,
          clan: results[0].clan,
          clan_boss: results[0].clan_boss,
        };
        user = req.session.user; // Save user data in global variable
        return res.status(200).send('Login Successful');
      } else {
        return res.status(401).send('Incorrect Password');
      }
    } else {
      return res.status(404).send('User Not Found');
    }
  });
});

// Endpoint to retrieve session data
app.get('/session', (req, res) => {
  console.log('session back 도착', user)
  const { user_id, user_nick, clan_boss, clan } = user;
  let sessionObj = {
    user_id: user_id,
    user_nick: user_nick,
    clan_boss: clan_boss,
    clan: clan,
  }
  res.json(sessionObj);
});

// Endpoint to check if user is logged in
app.get('/checkLogin', (req, res) => {
  if (req.session.user && req.session.user.user_id) {
    return res.send('User is logged in');
  } else {
    return res.send('User is not logged in');
  }
});

// 세션 종료를 처리하는 엔드포인트(로그아웃)
app.post('/logout', (req, res) => {
  req.session.user = null; // 세션 정보를 제거합니다.
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error destroying session');
    }
    console.log('세션바이');
    return res.sendStatus(200);
  });
});

//=======================================================

app.use('/uploads', express.static('uploads'));

// 파일저장 객체
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 파일이 저장될 경로
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
});

const upload = multer({ storage: storage });


// (클랜)게시판(클랙제작) 작성 기능
app.post('/api/boardInsert', upload.single('file'), (req, res) => {
  const { title, content, userId, userCount } = req.body;
  const file = req.file ? req.file.filename : null;
  const image = file ? '/uploads/' + file : null;



  const clansInsertSql = `INSERT INTO clans (clan_boss_id, clan_limit, clan_logo, clan_name, created_at)
  VALUES ('${userId}', ${userCount}, '${image}', '${title}', NOW())`;

  const boardsInsertSql = `INSERT INTO boards (b_content, b_file, b_title, user_id, created_at)
  VALUES ('${content}', '${image}', '${title}', '${userId}', NOW())`;

  const clanInfoUdate = `UPDATE users SET clan_boss = 'y', clan = '${title}' WHERE user_id = '${userId}';
`;

  connection.query(clansInsertSql, (err) => {
    if (err) {
      console.error('Error inserting data into clans table:', err);
      res.status(500).send('Error inserting data into clans table');
      return;
    }

    connection.query(boardsInsertSql, (err) => {
      if (err) {
        console.error('Error inserting data into boards table:', err);
        res.status(500).send('Error inserting data into boards table');
        return;
      }

      connection.query(clanInfoUdate, (err) => {
        if (err) {
          console.error('Error udate clanInfoUdate into users table', err);
          res.status(500).send('Error udate clanInfoUdate into users table:');
          return;
        }
      })

    

      res.status(200).send('Successfully inserted data');
    });
  });
});


// 댓글 작성 기능
app.post('/api/commentInsert', async (req, res) => {
  const { b_idx, user_id, cmt_content } = req.body;

  const created_at = new Date().toISOString(); // 댓글 작성 시간 생성

  // Construct comment data
  const newComment = {
    b_idx,
    user_id,
    cmt_content,
    created_at,
  };

  try {
    // Store the new comment in the database
    await connection.query(
      'INSERT INTO comments(b_idx, user_id, cmt_content, created_at) VALUES (?, ?, ?, ?)',
      [newComment.b_idx, newComment.user_id, newComment.cmt_content, newComment.created_at]
    );

    res.status(200).send('댓글이 성공적으로 등록되었습니다.');
  } catch (error) {
    console.error('댓글 등록 중 에러가 발생했습니다', error);
    res.status(500).send('댓글 등록에 실패했습니다.');
  }
});


// 댓글 리스트 API 앤드포인트
app.get('/api/comment/:idx', (req, res) => {
  const { idx } = req.params;
  console.log('댓글', idx)

  const sql = `SELECT c.*, u.user_nick
  FROM comments c INNER JOIN users u ON c.user_id = u.user_id WHERE c.b_idx = ${idx}
  ORDER BY c.cmt_idx DESC`;

  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data)
  })
});

// 팀 정보 요청 앤드포인트
app.get('/api/teams', (req, res) => {
  const sql = "SElECT * FROM teams WHERE team_idx <= 10";
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data)
  })
})

// 노드 팀 idx에 따른 팀정보 앤드포인트
app.get('/api/teaminfo/:team_idx', (req, res) => {
  const idx = req.params.team_idx;
  console.log(idx)
  const sql = `SELECT * FROM teams WHERE team_idx = ${idx}`;
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data)
  })
})


// 일정등록
app.post('/api/addSchedule', (req, res) => {
  const { calendarType, st_dt, ed_dt, st_tm, ed_tm, sche_content, user_id } = req.body;
  console.log('캘린더타입', calendarType)

  if (calendarType === '1') {
    const query = 'INSERT INTO user_schedules (user_id, st_dt, ed_dt, st_tm, ed_tm, sche_content) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [user_id, st_dt, ed_dt, st_tm, ed_tm, sche_content], (err, result) => {
      if (err) {
        console.error('개인일정 등록 중 에러 발생:', err);
        res.status(500).send('서버 에러');
      } else {
        console.log('개인일정이 성공적으로 등록되었습니다.');
        res.sendStatus(200);
      }
    });
  } else if (calendarType === '2') {
    const query = 'INSERT INTO clan_schedules (st_dt, ed_dt, st_tm, ed_tm, sche_content, user_id) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [st_dt, ed_dt, st_tm, ed_tm, sche_content, user_id], (err, result) => {
      if (err) {
        console.error('클랜 일정 등록 중 에러 발생:', err);
        res.status(500).send('서버 에러');
      } else {
        const sche_idx = result.insertId;
        const shareQuery = 'INSERT INTO clan_schedule_shares (sche_idx, user_id, share_id) VALUES (?, ?, ?)';
        connection.query(shareQuery, [sche_idx, user_id, user_id], (shareErr, shareResult) => {
          if (shareErr) {
            console.error('클랜 일정 공유 중 에러 발생:', shareErr);
            res.status(500).send('서버 에러');
          } else {
            console.log('클랜 일정이 성공적으로 등록되었습니다.');
            res.sendStatus(200);
          }
        });
      }
    });
  }
});

// 클랜 일정 조회
app.get('/api/sharedSchedules/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  const sql = `
  SELECT cs.* 
  FROM clan_schedules cs
  JOIN users u ON cs.user_id = u.user_id
  WHERE u.clan = (
    SELECT clan 
    FROM users 
    WHERE user_id = ?
  )
  `;
  connection.query(sql, [userId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });

});


// 회원정보 수정 
app.post('/api/updateUserInfo', (req, res) => {
  // 클라이언트로부터 전송된 수정된 정보를 가져옵니다.
  const { user_id, user_nick, user_phone } = req.body;

  // MySQL 쿼리를 사용하여 데이터 업데이트를 수행합니다.
  const updateUserQuery = `UPDATE users SET user_nick = ?, user_phone = ? WHERE user_id = ?`;
  connection.query(updateUserQuery, [user_nick, user_phone, user_id], (err, result) => {
    if (err) {
      console.error('사용자 정보 업데이트 중 오류 발생:', err);
      return res.status(500).send('사용자 정보 업데이트 중 오류가 발생했습니다.');
    }
    console.log('사용자 정보가 성공적으로 업데이트되었습니다.');
    res.send('사용자 정보가 성공적으로 업데이트되었습니다.');
  });
});

// 사용자 정보 가져오기
app.post('/UserInfo', (req, res) => {
  const userId = req.body.user_id; // 수신된 데이터
  console.log('Received data:', userId);
  const sql = `SELECT * FROM users WHERE user_id = '${userId}';`;
  connection.query(sql, (err, result) => {
    if(err){
      console.error('사용자 정보 가져오기 중 오류 발생:', err);
      return res.status(500).send('사용자 정보 가져오기 중 오류가 발생했습니다.');
    }
    res.json(result) // 응답
    // res.send('Data received successfully');
  })
});


// 회원 탈퇴 엔드포인트
app.delete('/api/userDelete/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  // 회원 스케쥴 삭제
  const deleteScheduleQuery =`DELETE FROM user_schedules WHERE user_id = '${userId}'`;
  connection.query(deleteScheduleQuery, (err, result) => {
    if (err) {
      console.error('Error deleting schedules:', err);
      res.status(500).send({ message: 'Error occurred while deleting schedules.' });
      return;
    }

    // 회원의 댓글 삭제
    const deleteCommentsQuery = `DELETE FROM comments WHERE user_id = '${userId}'`;
    connection.query(deleteCommentsQuery, (err, result) => {
      if (err) {
        console.error('Error deleting comments:', err);
        res.status(500).send({ message: 'Error occurred while deleting comments.' });
        return;
      }

      // 회원의 게시글 삭제
      const deleteBoardQuery = `DELETE FROM boards WHERE user_id = '${userId}'`;
      connection.query(deleteBoardQuery, (err, result) => {
        if (err) {
          console.error('Error deleting posts:', err);
          res.status(500).send({ message: 'Error occurred while deleting posts.' });
          return;
        }

        // 회원삭제
        const deleteUserQuery = `DELETE FROM users WHERE user_id = '${userId}'`;
        connection.query(deleteUserQuery, (err, result) => {
          if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send({ message: 'Error occurred while deleting user.' });
          } else {
            res.status(200).send({ message: 'User deleted successfully.' });
          }
        });
      });
    });
  });
});

// 게시판 리스트
app.get("/api/boardList", (req, res) => {
  const q = "SELECT * FROM boards";
  connection.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// 특정 게시판 보기
app.get('/api/board/:idx', (req, res) => {
  const idx = req.params.idx;
  console.log('게시판', idx);

  const sql = `SELECT b.*, u.user_nick
    FROM boards b
    INNER JOIN users u ON b.user_id = u.user_id
    WHERE b.b_idx = ${idx}`;

  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data)
  })
});

// 구독 추가, 삭제
app.post('/api/subscribe', async (req, res) => {
  const { userId, teamIdx, isSubscribed } = req.body;
  console.log('추가:',  userId, teamIdx, isSubscribed);


  if (isSubscribed) {
    // 구독 추가
    const query = 'INSERT INTO subscriptions (user_id, team_idx, created_at) VALUES (?, ?, NOW())'
    const params = [userId, teamIdx];
    connection.query(query, params, (error, result) => {
      if (error) {
        res.status(500).json({ error });
      } else {
      }
    });
  } else {
    // 구독 해제
    const query = 'DELETE FROM subscriptions WHERE user_id = ? AND team_idx = ?';
    const params = [userId, teamIdx];
    connection.query(query, params, (error, result) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(200).json({ message: 'Subscription removed successfully.' });
      }
    });
  }
});

// 팀 구독 정보 가져오기
app.post('/api/subscription', (req, res) => {
  const { user_id, team_idx } = req.body; // 수신된 데이터
  console.log('구독정보 : ',user_id, team_idx);

  const sql = `
  SELECT * 
  FROM subscriptions 
  WHERE user_id = '${user_id}' 
    AND team_idx = ${team_idx}`

  connection.query(sql, (err, data) => {
    if(err){
      console.error('구독 정보 받아오기 중 에러 발생', err);
      return res.status(500).send('구독 정보를 받아오는중 에러가 발생하였습니다.')
    }
    return res.json(data); // 응답
  });
});



// '// 팀 구독 전체 가져오기
// app.get('/api/subscription', (req, res) => {

//   console.log('app get user')
//   const userId = req.session.userId;

//   if (!userId) {
//     res.status(401).send('Unauthorized');
//     return;
//   }

//   const query = `
//     SELECT subscriptions.user_id, teams.team_name
//     FROM subscriptions
//     INNER JOIN teams ON subscriptions.team_idx = teams.team_idx
//     WHERE subscriptions.user_id = ?
//   `;

//   connection.query(query, [userId], (error, results) => {
//     if (error) {
//       console.error('Error fetching user subscriptions:', error);
//       res.status(500).send('Error fetching user subscriptions');
//     } else {
//       const userSubscriptions = results;
//       res.json(userSubscriptions);
//     }
//   });
// });'

// 마이페이지에서 구독정보 가져오기
app.get('/api/Mypagesubscription/:userId' ,(req, res) => {

  const userId = req.params.userId;
  console.log(userId)

  if (!userId) {
    res.status(401).send('Unauthorized');
    return;
  }

  const query = `
    SELECT teams.team_name
    FROM subscriptions
    INNER JOIN teams ON subscriptions.team_idx = teams.team_idx
    WHERE subscriptions.user_id = '${userId}';
  `;

  connection.query(query,(error, results) => {
    if (error) {
      console.error('Error fetching user subscriptions:', error);
      res.status(500).send('Error fetching user subscriptions');
    } else {
      res.json(results);
    }
  });
});


// 클랜 생성 

// bodyParser를 사용하여 POST 요청의 본문을 파싱합니다.
app.use(bodyParser.json());

app.post('/api/ClanCreate', (req, res) => {
  const userId = req.session.userId;

  const clanData = req.body;
  console.log(userId);

  console.log('클랜데이터 출력:', clanData);

  const sql = `INSERT INTO clans (clan_boss_id, clan_name, clan_limit, created_at, clan_is, clan_logo)
  VALUES ('${userId}', '${clanData.clanName}', ${clanData.clanMembers}, NOW(), 'Y', '${clanData.clanImage}')`;

  res.send('클랜 생성 데이터 전송성공');
  // SQL 쿼리 실행
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('클랜 생성 에러:', err);
      return;
    }
    console.log('클랜 생성 성공');
    // 쿼리 결과 출력
    console.log('Insert ID:', results.insertId);
  });

});

// 클랜 삭제 기능
app.delete('/api/ClanDelete/:userId', (req, res) => {
  const boss_id = req.params.userId;

  // 클랜 삭제를 위한 SQL 문
  const deleteCommentsQuery = `DELETE FROM comments WHERE user_id = '${boss_id}'`;
  const deleteBoardQuery = `DELETE FROM boards WHERE user_id = '${boss_id}'`;

  connection.query(deleteCommentsQuery, (err, result) => {
    if (err) {
      console.error('Error updating users:', err);
      res.status(500).send({ message: 'Error occurred while updating users.' });
      return;
    }

    connection.query(deleteBoardQuery, (err, result) => {
      if (err) {
        console.error('Error updating users:', err);
        res.status(500).send({ message: 'Error occurred while updating users.' });
        return;
      }


  // 클랜에 속한 사용자들의 clan 컬럼을 null로 업데이트
  const updateUsersQuery = `UPDATE users SET clan = NULL WHERE clan = (SELECT clan_name FROM clans WHERE clan_boss_id = '${boss_id}')`;

  connection.query(updateUsersQuery, (err, result) => {
    if (err) {
      console.error('Error updating users:', err);
      res.status(500).send({ message: 'Error occurred while updating users.' });
      return;
    }

  // 클랜장의 보스 여부 변경
  const updateclanbossQuery = `UPDATE users SET clan_boss = 'n' WHERE user_id ='${boss_id}'`;
  connection.query(updateclanbossQuery, (err, result) => {
    if (err) {
      console.error('Error updating users:', err);
      res.status(500).send({ message: 'Error occurred while updating users.' });
      return;
    }



    // 클랜 삭제를 위한 SQL 문
    const deleteClanQuery = `DELETE FROM clans WHERE clan_boss_id = '${boss_id}'`;
    connection.query(deleteClanQuery, (err, result) => {
      if (err) {
        console.error('Error deleting clan:', err);
        res.status(500).send({ message: 'Error occurred while deleting clan.' });
        return;
      }

      res.status(200).send({ message: 'Clan deleted successfully.' });
    });
    });
    });
  });
  });
});
// 클랜 멤버 가져오기
app.post('/api/ClanMember', (req, res) => {
  const userId = req.body.user_id; // 수신된 데이터
  console.log('Received data:', userId);
  const sql = 
  `SELECT user_nick
  FROM users
  WHERE clan = (SELECT clan FROM users WHERE user_id = '${userId}') AND clan_boss = 'n';`;
  connection.query(sql, (err, result) => {
    if(err){
      console.error('클랜 멤버 가져오기 중 오류 발생:', err);
      return res.status(500).send('클랜 멤버 가져오기 중 오류가 발생했습니다.');
    }
    res.json(result) // 응답
  })
});

// 클랜 멤버 탈퇴시키기
app.delete('/api/ClanMemberDelete/:userNick', (req,res)=>{
  const user_nick = req.params.userNick;
  const sql = `UPDATE users SET clan = NULL WHERE user_nick = '${user_nick}'`;
  connection.query(sql, (err, result) => {
    if(err){
      console.log('클랜 멤버 탈퇴 오류', err);
      return res.status(500).send('클랜 멤버를 탈퇴하는 중 오류가 발생하였습니다')
    }
    res.status(200).send({message: '클랜 멤버 탈퇴 성공'})
  })
})


// 일정 가져오기
app.get('/api/schedule/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  // 개인 일정 가져오기
  const personalQuery = 'SELECT * FROM user_schedules WHERE user_Id = ?';
  connection.query(personalQuery, [userId], (err, personalScheduleData) => {
    if (err) return res.json(err);



    // 클랜 일정 가져오기
    const clanQuery = `
    SELECT cs.* 
    FROM clan_schedules cs
    JOIN users u ON cs.user_id = u.user_id
    WHERE u.clan = (
      SELECT clan 
      FROM users 
      WHERE user_id = ?
      )
    `;
    connection.query(clanQuery, [userId], (err, clanScheduleData) => {
      if (err) return res.json(err);

      // 구독한 팀의 경기일정 가져오기
      const subscribedMatchQuery = `
      SELECT ms.*
      FROM matches ms
      JOIN subscriptions s ON ms.team_1 = s.team_idx OR ms.team_2 = s.team_idx 
      WHERE s.user_id =  ?
      `;
      connection.query(subscribedMatchQuery, [userId], (err, subscribedMatchScheduleData) => {
        if (err) return res.json(err);

        // 모든 일정 데이터를 JSON 형태로 응답
        res.json({
          personal: personalScheduleData,
          clan: clanScheduleData,
          subscribedMatch: subscribedMatchScheduleData
        });
      });
    });
  });
});

// 일정 삭제 기능
app.post('/api/deleteSchedule', async (req, res) => {
  const { calendarType, sche_idx, user_id, clan_boss } = req.body;
  console.log('정보 : ',calendarType,sche_idx,user_id, clan_boss);

  try {
    if (calendarType === 1) {
      // 개인 일정 삭제
      await connection.query('DELETE FROM user_schedules WHERE sche_idx = ? AND user_id = ?', [sche_idx, user_id]);
    } else if (calendarType === 2 && clan_boss==='y') {
      // 클랜 일정 삭제
      await connection.query('DELETE FROM clan_schedule_shares WHERE sche_idx = ? AND user_id = ?', [sche_idx, user_id]);
      await connection.query('DELETE FROM clan_schedules WHERE sche_idx = ? AND user_id = ?',[sche_idx, user_id]);
    }

    res.status(200).send('Schedule deleted successfully');
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).send('Error deleting schedule');
  }
});



// 게시판 수정 기능
app.put('/api/boardUpdate/:b_idx', (req, res) => {
  const b_idx = req.params.b_idx;
  const { user_id, title, content } = req.body;
  console.log(b_idx,user_id,title,content);

  const sql = `UPDATE boards SET b_content = '${content}', b_title ='${title}' WHERE b_idx = ${b_idx} AND user_id = '${user_id}'`;
  connection.query(sql, (err, result) => {
    if(err){
      console.log('보드 수정 에러', err);
      return res.status(500).send('보드 수정 에러');
    }
    
    res.status(200).send('board Update successfully');
});

});

// 게시판 삭제 기능

app.delete('/api/boardDelete/:b_idx/:user_id', (req, res) => {
  // 클라이언트로부터 받은 게시글 인덱스와 사용자 아이디를 가져옵니다.
  const { b_idx, user_id } = req.params;
  console.log('삭제',b_idx,user_id);

  
  const deleteCommentsQuery = `DELETE FROM comments WHERE b_idx = ${b_idx} AND user_id = '${user_id}'`;
  const deleteBoardQuery = `DELETE FROM boards WHERE b_idx = ${b_idx} AND user_id = '${user_id}'`;


  connection.query(deleteCommentsQuery, (error, commentsResult) => {
    if (error) {
      console.error('댓글 삭제 에러:', error);
      return res.status(500).send({ error: '댓글 삭제 중 에러가 발생했습니다.' });
    
    }

  connection.query(deleteBoardQuery, (error, boardResult) => {
    if (error) {
      console.error('게시글 삭제 에러:', error);
      res.status(500).send({ error: '게시글 삭제 중 에러가 발생했습니다.' });
      return;
    }

  // 성공 메시지 반환
        res.status(200).send('게시글 삭제 성공');
    });
  });
});


app.post('/api/joinClan', (req, res) => {
  
  const {clan ,user_id }= req.body;
  console.log('클랜가입',clan,user_id)

  // 사용자를 클랜에 추가하는 쿼리
  const addUserQuery = `UPDATE users SET clan = '${clan}' WHERE user_id = '${user_id}'`;
  connection.query(addUserQuery, (error, results) => {
    if (error) {
      console.error('사용자 추가 오류:', error);
      return res.status(500).send('사용자를 클랜에 추가하는 중 오류가 발생했습니다.');
    }
    return res.status(200).send('사용자가 성공적으로 클랜에 추가되었습니다.');
  });
});



// 서버 실행
app.listen(port, () => {
  console.log('server is running at 5000');
  //scheduleMatches(); 문자서비스 코드_살리지 말것.
});

