//mysql 드라이버 불러오기
const mysql = require('mysql2'); 

// db 연결 객체 생성
const mysqlConnection = {
    init: function() {         
        return mysql.createConnection({
            host: 'project-db-campus.smhrd.com',
            port: '3307',
            user: 'campus_23K_AI18_p2_3',
            password: 'smhrd3',
            database: 'campus_23K_AI18_p2_3'
        });
    },
    // 커넥션 객체를 db와 연결
    open: function(con) {      
        con.connect(err => {
            if(err) {
                console.log("MySQL 연결 실패 : ", err);
            } else {
                console.log("MySQL Connected!!!");
            }
        });
    },
    //db와 연결 종료
    close: function(con) {      
        con.end(err => {
            if(err) {
                console.log("MySQL 종료 실패 : ", err);
            } else {
                console.log("MySQL Terminated...");
            }
        })
    }
}

module.exports = mysqlConnection; //생성한 mysqlConnection 객체를 모듈화하여 외부 파일에서 불러와 사용할 수 익스포트

