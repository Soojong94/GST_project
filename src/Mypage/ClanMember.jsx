import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClanMember() {
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
                            <td><button>탈퇴</button></td>
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
