const { createPool } = require('../db');
const fs = require('fs').promises;

const pool = createPool();

async function update() {
    try {
        const data = await fs.readFile('./update.json', 'utf8');
        const jsonData = JSON.parse(data);

        // 이번 달에 해당하는 데이터 삭제
        const deleteQuery = `DELETE FROM test2 WHERE MONTH(matched_at) = MONTH(CURRENT_DATE()) AND YEAR(matched_at) = YEAR(CURRENT_DATE())`;
        pool.query(deleteQuery, (err, results) => {
            if (err) {
                console.log(' UD데이터베이스 쿼리 실행 실패:', err);
                return;
            }

            // 새로운 데이터 입력
            for (let i = 0; i < jsonData.length; i++) {
                const item = jsonData[i];
                const { team_1, team_1_score, team_2, team_2_score, matched_at, match_is } = item;

                const query = `INSERT INTO test2 (team_1, team_1_score, team_2, team_2_score, matched_at, match_is) VALUES (${team_1}, ${team_1_score}, ${team_2}, ${team_2_score}, '${matched_at}', '${match_is}')`;

                pool.query(query, (err, results) => {
                    if (err) {
                        console.log('UD데이터베이스 쿼리 실행 실패:', err);
                    }
                });
            }
        });
    } catch (err) {
        console.error('오류 발생:', err);
    }
};

module.exports = update;