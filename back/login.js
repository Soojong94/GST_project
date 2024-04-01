const express = require('express');
const axios = require('axios');
const session = require('express-session');//세션
const bodyParser = require('body-parser')
const mysqlConnection = require('./mysql')
const cors = require('cors'); // cor 패키지
const http = require('http') // cor와 함께 사용할 아이
const app = express();
const port = 5000;
const multer = require('multer');
const { match } = require('assert');
const bcrypt = require('bcrypt');
app.use(cors());

const connection = mysqlConnection.init();
mysqlConnection.open(connection);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(session({
  secret: 'secret key',   // 암호화
  resave: false,   
  saveUninitialized: true,   
  cookie: {   
    httpOnly: true,
  },
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

const handleDuplicateError = (results, user_id, user_nick) => {
    if (results[0].user_id === user_id) {
        throw new Error('Duplicate ID');
    } else if (results[0].user_nick === user_nick) {
        throw new Error('Duplicate Nickname');
    }
};

// 회원가입

app.post('/signup', async (req, res, next) => {
    const { user_id, user_nick, user_phone, user_pw } = req.body;
    const hashedPassword = await bcrypt.hash(user_pw, 10);

    // Check if user_id or user_nick already exists
    connection.query('SELECT * FROM users WHERE user_id = ? OR user_nick = ?', [user_id, user_nick], (error, results) => {
        if (error) return next(error);

        if (results.length > 0) {
            handleDuplicateError(results, user_id, user_nick);
        } else {
            // Insert the new user into the database
            const newUser = {
                user_id,
                user_nick,
                user_phone,
                user_pw: hashedPassword,
                joined_at: new Date(),
            };
            connection.query('INSERT INTO users SET ?', newUser, (error, results) => {
  if (error) return next(error);
  
  req.session.user = newUser;
  res.status(200).json({ message: 'Signup Successful' });
            });
        }
    });
});

// 로그인
// Endpoint for user login
app.post('/login', async (req, res, next) => {
  const { user_id, user_pw } = req.body;
  connection.query('SELECT * FROM users WHERE user_id = ?', [user_id], async (error, results) => {
      if (error) return next(error);
      if (results.length > 0) {
          const comparison = await bcrypt.compare(user_pw, results[0].user_pw);
          if (comparison) {
              req.session.user = results[0];
              res.status(200).send('Login Successful');
          } else {
              res.status(401).send('Incorrect Password');
          }
      } else {
          res.status(404).send('User Not Found');
      }
  });
});

// 세션 리액트로 전송
app.get('/session', (req, res) => {
  const user = req.session.user;
  if (user) {
      const { user_id, user_nick, clan_boss } = user;
      let sessionObj = {
          user_id: user_id,
          user_nick: user_nick,
          clan_boss: clan_boss
      };
      res.json(sessionObj);
  } else {
      res.status(401).send('Session not found');
  }
});
//세션 확인 엔드포인트
app.get('/checkLogin', (req, res) => {
  if (req.session.user) {
      res.send('User is logged in');
  } else {
      res.send('User is not logged in');
  }
});


//=======================================================


// 파일 저장을 위한 multer 설정
const storage = multer.diskStorage({
 
      destination: function (req, file, cb) {
        cb(null, 'uploads/') // 파일이 저장될 경로
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
      }
    }
);

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/board', upload.single('b_file'), async (req, res) => {
  try {
    // 요청 정보 출력
    console.log('요청 정보:', req.body);

    const { b_title, b_content, created_at } = req.body;
    const b_file = req.file ? req.file.path : '';
    const user_id = req.session.user_id;

    // SQL 쿼리 실행
    const query = 'INSERT INTO posts (b_title, b_content, b_file, created_at, user_id) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [b_title, b_content, b_file, created_at, user_id]);

    // 응답 정보 출력
    console.log('응답 정보:', { message: '게시글이 성공적으로 등록되었습니다.', postId: result.insertId });

    res.status(200).json({ message: '게시글이 성공적으로 등록되었습니다.', postId: result.insertId });
  } catch (error) {
    // 오류 정보 출력
    console.error('오류 정보:', error);

    res.status(500).json({ message: '게시글 등록 중 오류가 발생했습니다.', error: error.message });
  }
});
// 댓글 등록 API 엔드포인트
app.post('/api/comment', (req, res) => {
  const { b_idx, cmt_content, created_at, user_id } = req.body; // 클라이언트로부터 받은 데이터
  const query = 'INSERT INTO comments (b_idx, cmt_content, created_at, user_id) VALUES (?, ?, ?, ?)';
  console.log('댓글 등록',b_idx, cmt_content, created_at, user_id )

  connection.query(query, [b_idx, cmt_content, created_at, user_id], (err, result) => {
    if (err) {
      console.error('댓글 등록 중 에러 발생:', err);
      res.status(500).send('서버 에러');
    } else {
      res.send('댓글이 성공적으로 등록되었습니다.');

    }
  });
  
  const upload = multer({ storage: storage });
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // '/api/boardInsert' 경로에 대한 POST 요청 처리
  app.post('/api/boardInsert', upload.single('file'), (req, res) => {
    const nick = req.session.user_nick; // 세션에서 사용자 닉네임 가져오기 (사용자 인증 구현 필요)
    const user_id = req.body.user_id; // 사용자 ID 처리 (사용자 인증 구현 필요)
    const b_title = req.body.title;
    const b_content = req.body.content;
    const b_file = req.file ? req.file.path : ''; // 파일이 있다면 파일 경로 저장
    const b_created_at = new Date();

  
    // 데이터베이스 연결 및 쿼리 실행 코드 (여기서는 예시로만 표시)
    const sql = `INSERT INTO boards (b_title, b_content, b_file, created_at, user_id) 
                 VALUES (?, ?, ?, ?, ?)`;
    const values = [b_title, b_content, b_file, b_created_at, user_id];
  
    // 데이터베이스 쿼리 실행 (예시 코드)
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting data');
      } else {
        console.log('Data inserted successfully');
        res.sendStatus(200);
      }
    });
  });
  

});


// 댓글 리스트 API 앤드포인트
app.get('/api/comment/:idx', (req, res) => {
  const { idx } = req.params;
  console.log('댓글',idx)

  const sql = ` SELECT c.*, u.user_nick
    FROM comments c INNER JOIN users u ON c.user_id = u.user_id WHERE c.b_idx = ${idx}`;

  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data)
  })
});

// 팀 정보 요청 앤드포인트
app.get('/api/teams',(req, res)=>{
  const sql = "SElECT * FROM teams WHERE team_idx <= 10";
  connection.query(sql,(err, data)=>{
    if(err) return res.json(err);
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


// 일정 등록

// Route to receive new schedule data from client and insert into database
app.post('/api/addSchedule', (req, res) => {

  // 세션에서 사용자 ID 가져오기
  // const userId = req.session.userId;

  // 세션에 저장된 사용자 ID를 이용해 데이터베이스에 새로운 일정 추가 calendarType에 따른 분류
  

  const query = 'INSERT INTO schedule (calendarType, title, startDate, endDate, time, location, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const { calendarType, title, startDate, endDate, time, location, description } = req.body;

  connection.query(query, [ calendarType, title, startDate, endDate, time, location, description], (err, result) => {
    if (err) {
      console.error('일정 등록 중 에러 발생:', err);
      res.status(500).send('서버 에러');
    } else {
      console.log('일정이 성공적으로 등록되었습니다.');
      res.sendStatus(200);
    }
  });
});

// 일정 보여주는 코드
app.get('/api/getSchedule', (req, res) => {
  // 세션에서 사용자 ID 가져오기
  const userId = req.session.userId;

  // 데이터베이스에서 해당 사용자의 일정 가져오기
  const query = 'SELECT * FROM schedule WHERE userId = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('일정 조회 중 에러 발생:', err);
      res.status(500).send('서버 에러');
    } else {
      console.log('일정 조회 성공:', results);
      // 클라이언트에게 일정 데이터 전송
      res.status(200).json(results);
    }
  });
});

  // 회원정보 수정

 app.post('/updateUser', (req, res) => {
  const { user_id, user_nick, user_phone } = req.body;
  const sql = "UPDATE users SET user_nick = ?, user_phone = ? WHERE user_id = ?";
  const values = [user_nick, user_phone, user_id];

  // 데이터베이스 라이브러리를 사용하여 쿼리 실행
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    // 쿼리 실행 결과 처리
    res.send('사용자 정보가 성공적으로 업데이트되었습니다.');
  });
});

// 로그인한 사용자의 정보를 가져오기
app.get('/userinfo', (req, res) => {
const user_id = req.session.user_id; // 세션에서 사용자 ID 가져오기

if (!user_id) {
    return res.status(401).json({ message: '로그인 되어있지 않습니다.' });
}

connection.query(`SELECT * FROM users WHERE user_id = ?`, [user_id], (error, results, fields) => {
    if (error) throw error;

    if (results.length > 0) {
        const user = results[0];
        res.json(user);
    } else {
        res.status(404).json({ message: '유저정보를 찾지 못했습니다' });
    }
});
});

// 회원 탈퇴 엔드포인트
app.delete('/userDelete/:user_id', (req, res) => {
  const userId = req.params.user_id;

  // 회원의 댓글 삭제
  const deleteCommentsQuery = 'DELETE FROM comments WHERE user_id = ?';
  connection.query(deleteCommentsQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting comments:', err);
      res.status(500).send({ message: 'Error occurred while deleting comments.' });
      return;
    }

    // 회원의 게시글 삭제
    const deleteBoardQuery = 'DELETE FROM boards WHERE user_id = ?';
    connection.query(deleteBoardQuery, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting posts:', err);
        res.status(500).send({ message: 'Error occurred while deleting posts.' });
        return;
      }

      // 회원삭제
      const deleteUserQuery = 'DELETE FROM users WHERE user_id = ?';
      connection.query(deleteUserQuery, [userId], (err, result) => {
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

// 일정 공유 파트

// Route to receive new schedule data from client and insert into database
app.post('/api/addSchedule', (req, res) => {

  // 세션에서 사용자 ID 가져오기
  // const user_id = req.session.userId;

  // 세션에 저장된 사용자 ID를 이용해 데이터베이스에 새로운 일정 추가

  const query = 'INSERT INTO user_schedules (user_id, st_dt, ed_dt, st_tm, ed_tm, sche_content, sche_color, sche_is) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const { user_id, st_dt, ed_dt, st_tm, ed_tm, sche_content, sche_color, sche_is } = req.body;

  connection.query(query, [ user_id, st_dt, ed_dt, st_tm, ed_tm, sche_content, sche_color, sche_is], (err, result) => {
    if (err) {
      console.error('일정 등록 중 에러 발생:', err);
      res.status(500).send('서버 에러');
    } else {
      console.log('일정이 성공적으로 등록되었습니다.');
      res.sendStatus(200);
    }
  });
});

// 일정 보여주는 코드

app.get('/api/getSchedule', (req, res) => {
  // 세션에서 사용자 ID 가져오기
  const userId = req.session.userId;

  // 데이터베이스에서 해당 사용자의 일정 가져오기
  const query = 'SELECT * FROM user_schedules WHERE user_id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('일정 조회 중 에러 발생:', err);
      res.status(500).send('서버 에러');
    } else {
      console.log('일정 조회 성공:', results);
      // 클라이언트에게 일정 데이터 전송
      res.status(200).json(results);
    }
  });
});



app.get('/clanBossMembers/:clanName', (req, res) => {
  const clanName = req.params.clanName;

  const query = `SELECT user_nick FROM users WHERE clan = ? AND clan_boss = true`;

  connection.query(query, [clanName], (err, results) => {
    if (err) {
      console.error('Error fetching clan boss members:', err);
      res.status(500).send({ error: 'Failed to fetch clan boss members' });
    } else {
      const nicknames = results.map(result => result.nickname);
      res.status(200).send(nicknames);
    }
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
  app.get('/api/board/:idx', (req, res)=>{
        const idx = req.params.idx;
        console.log('게시판',idx);
    
        const sql = `SELECT b.*, u.user_nick
    FROM boards b
    INNER JOIN users u ON b.user_id = u.user_id
    WHERE b.b_idx = ${idx}` ;

        connection.query(sql,(err,data)=>{
            if(err) return res.json(err);
            return res.json(data)
        })
      });

    

// 서버 실행
app.listen(port, () => {
  console.log('server is running at 5000');
});
