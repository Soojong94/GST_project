import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClanMember() {
    // 클랜 멤버 데이터 가져오기
    const [Data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userinfo = JSON.parse(sessionStorage.getItem("user"))
                console.log('session', userinfo.user_id);
                if (userinfo) {
                    const userId = userinfo.user_id;
                    const dataSend = { user_id: userId };
                    const response = await axios.post('http://localhost:5000/api/ClanMember', dataSend)
                    setData(response.data);
                    console.log(response.data);
                } else {
                    console.log('클랜멤버가 없습니다.')
                }
            } catch (error) {
                console.error('클랜멤버 전달 에러:', error);
            }
        };

        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = Data && Data.slice(firstIndex, lastIndex);
    const npage = Math.ceil((Data && Data.length) / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeCPage = (id) => {
        setCurrentPage(id);
    };

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 클랜 회원 탈퇴
    const handleclanmemberdelete = async (userNick) => {
        try {
            const confirm = window.confirm(`${userNick}님을 탈퇴시키겠습니까?`);
            if(confirm){
                const response = await axios.delete(`http://localhost:5000/api/ClanMemberDelete/${userNick}`)
                console.log('클랜 탈퇴 성공:', response.data);
            }else{
                console.log('탈퇴를 취소하셨습니다.');
            }
            window.location.reload();
        } catch (error) {
            console.error('클랜 탈퇴 실패:', error);
        }
    }

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>클랜원</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {records && records.map((d, i) => (
                        <tr key={i}>
                            <td>{d.user_nick}</td>
                            <td><button id='clanMemberDel-btn' onClick={() => handleclanmemberdelete(d.user_nick)}>탈퇴</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <navigator>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href='#' className='page-link'
                                onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='page-link'
                                        onClick={() => changeCPage(n)}>{n}</a>
                                </li>
                            ))
                        }
                        <li className='page-item'>
                            <a href='#' className='page-link'
                                onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </navigator>
            </div>
        </div>
    );
}

export default ClanMember;
