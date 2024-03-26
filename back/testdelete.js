const mysqlConnection = require('./mysql');

const connection = mysqlConnection.init();
mysqlConnection.open(connection);

// 이번 달에 해당하는 데이터 삭제
const deleteQuery = `DELETE FROM test2 WHERE MONTH(matched_at) = MONTH(CURRENT_DATE()) AND YEAR(matched_at) = YEAR(CURRENT_DATE())`;
connection.query(deleteQuery, (err, results) => {
    if (err) {
        console.log('데이터베이스 쿼리 실행 실패:', err);
    } else {
        console.log('이번 달 데이터 삭제 완료');
    }
});

// 데이터베이스 연결 종료
connection.end();