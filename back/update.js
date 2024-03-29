const mysqlConnection = require('./mysql');
const fs = require('fs').promises;

const connection = mysqlConnection.init();


async function update(connection) {
    mysqlConnection.open(connection);
    try {
        const data = await fs.readFile('./update.json', 'utf8');
        const jsonData = JSON.parse(data);

        // 이번 달에 해당하는 데이터 삭제
        const deleteQuery = `DELETE FROM test2 WHERE MONTH(matched_at) = MONTH(CURRENT_DATE()) AND YEAR(matched_at) = YEAR(CURRENT_DATE())`;
        connection.query(deleteQuery, (err, results) => {
                if (err) {
                    console.log(' UD데이터베이스 쿼리 실행 실패:', err);
                }

                // 새로운 데이터 입력
                for (let i = 0; i < jsonData.length; i++) {
                    const item = jsonData[i];
                    const { team_1, team_1_score, team_2, team_2_score, matched_at, match_is } = item;

                    const query = `INSERT INTO test2 (team_1, team_1_score, team_2, team_2_score, matched_at, match_is) VALUES (${team_1}, ${team_1_score}, ${team_2}, ${team_2_score}, '${matched_at}', '${match_is}')`;

                    connection.query(query, (err, results) => {
                        if (err) {
                            console.log('UD데이터베이스 쿼리 실행 실패:', err);
                        }

                        // 모든 쿼리가 완료되면 데이터베이스 연결 종료
                        if (i === jsonData.length - 1) {
                            connection.end();
                        }
                    })
                }
            });
        } catch (err) {
            console.log('JSON 파일 읽기 실패:', err);
        }
    };
// JSON 파일로부터 데이터를 데이터베이스에 입력


module.exports = update;