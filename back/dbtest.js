const mysqlConnection = require('./mysql');

const connection = mysqlConnection.init();

mysqlConnection.open(connection);

connection.query('SELECT * FROM Test', (err, results) => {
    if (err) {
        console.log("쿼리 실행 실패: ", err);
    } else {
        console.log("쿼리 결과: ", results);
        // 여기에서 결과를 처리하거나 원하는 작업을 수행합니다.
    }
});