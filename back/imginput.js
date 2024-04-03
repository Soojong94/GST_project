const mysql = require('mysql2/promise');
const util = require('util');

// MySQL 데이터베이스 연결 설정
const dbConfig = {
  host: 'project-db-campus.smhrd.com',
  port: '3307',
  user: 'campus_23K_AI18_p2_3',
  password: 'smhrd3',
  database: 'campus_23K_AI18_p2_3'
};

// MySQL 데이터베이스 연결 초기화
async function initDatabase() {
  const connection = await mysql.createConnection(dbConfig);
  connection.query = util.promisify(connection.query);
  return connection;
}

// 팀 로고 이미지를 데이터베이스에 저장하는 함수
async function saveLogoToDatabase(connection, teamIdx, logoUrl) {
  try {
    const updateQuery = 'UPDATE teams SET team_logo = ? WHERE team_idx = ?';
    await connection.query(updateQuery, [logoUrl, teamIdx]);
    console.log(`teamIdx ${teamIdx}에 대한 로고 URL이 저장되었습니다.`);
  } catch (error) {
    console.error(`teamIdx ${teamIdx}에 대한 로고 URL 저장에 실패했습니다. 오류: ${error}`);
  }
}

// 팀 로고 이미지를 데이터베이스에 저장하는 예시
const teamLogoPaths = [
  '../src/team_subsc/logo/T1.PNG',
  '../src/team_subsc/logo/GenG.PNG',
  '../src/team_subsc/logo/DK.PNG',
  '../src/team_subsc/logo/HLE.PNG',
  '../src/team_subsc/logo/KT.PNG',
  '../src/team_subsc/logo/DRX.PNG',
  '../src/team_subsc/logo/NS.PNG',
  '../src/team_subsc/logo/Fearx.PNG',
  '../src/team_subsc/logo/KDF.PNG',
  '../src/team_subsc/logo/BRO.PNG',
];

// 로고를 데이터베이스에 저장하는 함수
async function saveLogos() {
  try {
    const connection = await initDatabase(); // 데이터베이스 연결 초기화

    for (let i = 0; i < teamLogoPaths.length; i++) {
      const teamIdx = i + 1;
      const logoUrl = teamLogoPaths[i]; // 로고 이미지 경로를 URL로 사용
      await saveLogoToDatabase(connection, teamIdx, logoUrl);
    }

    connection.end(); // 데이터베이스 연결 종료
  } catch (error) {
    console.error('데이터베이스 연결 또는 로고 저장 실패:', error);
  }
}

saveLogos();