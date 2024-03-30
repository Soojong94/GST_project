import React, { useEffect, useState } from 'react';
import './Mypage.css';
import Sidebar from '../sidebar-02/sidebar';
import ClanMember from './ClanMember';



function Mypage() {

  const [users, setUsers] = useState([
    { id: "sapoon11@gmail.com", nickname: "User1", phoneNumber: "010-1234-5678", clanName: "Clan A", joinDate: "2024-03-29", clanBoss: true }
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedNickname, setEditedNickname] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');

  // 닉네임과 폰 번호를 수정하는 함수
  const handleEdit = async (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          nickname: editedNickname.trim() !== '' ? editedNickname : user.nickname,
          phoneNumber: editedPhoneNumber.trim() !== '' ? editedPhoneNumber : user.phoneNumber
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditingUser(null);
    setEditedNickname('');
    setEditedPhoneNumber('');

    // 수정된 회원 정보를 콘솔에 출력
    const updateUsers = JSON.stringify(updatedUsers);
    console.log(updateUsers);

    // 수정된 회원정보 node.js 서버로 http 포스트 요청을 보냄
    try {
      // if (editedNickname !== '' || editedPhoneNumber !== '') {
        const response = await fetch('http://localhost:5000/updateUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            updatedNickname: editedNickname,
            updatedPhoneNumber: editedPhoneNumber
          })
        });
    
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
    
        const updatedUser = await response.json();
        console.log('Updated user:', updatedUser);
      } catch (error) {
        console.error('Error updating user:', error.message);
      }
    };

  useEffect(() => {
    const allLinks = document.querySelectorAll(".tabs a");
    const allTabs = document.querySelectorAll(".tab-content");

    const shiftTabs = (linkId) => {
      allTabs.forEach((tab, i) => {
        if (tab.id.includes(linkId)) {
          allTabs.forEach((tabItem) => {
            tabItem.style = `transform: translateY(-${i * 540}px);`;
          });
        }
      });
    }

    allLinks.forEach((elem) => {
      elem.addEventListener('click', function () {
        const linkId = elem.id;
        const hrefLinkClick = elem.href;

        allLinks.forEach((link, i) => {
          if (link.href === hrefLinkClick) {
            link.classList.add("active");
          } else {
            link.classList.remove('active');
          }
        });

        shiftTabs(linkId);
      });
    });


    const currentHash = window.location.hash;

    let activeLink = document.querySelector(`.tabs a`);

    if (currentHash) {
      const visibleHash = document.getElementById(
        `${currentHash.replace('#', '')}`
      );

      if (visibleHash) {
        activeLink = visibleHash;
      }
    }

    activeLink.classList.toggle('active');

    shiftTabs(activeLink.id);
  }, []);

  return (
    <div className="tabs-container">
      <ul className="tabs">
        <li>
          <a id="tab1" title="Your Idea & Vision" href="#tab1">
          <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M7 18V17C7 14.2386 9.23858 12 12 12V12C14.7614 12 17 14.2386 17 17V18" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path>
            <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="10" stroke="#000000" stroke-width="1.5"></circle></svg>
            계정 관리
          </a>
        </li>
        <li>
          <a id="tab2" title="Product Specification" href="#tab2">
          <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" 
          xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" 
            stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>   
            구독 목록
          </a>
        </li>
        {users.map(user => (
          !user.clanBoss ? "" :
          <li key={user.id}>
            <a id="tab3" title="clan" href="#tab3">
            <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17.5 17.5C20 21 23.9486 18.4151 23 15C21.5753 9.87113 20.8001 7.01556 20.3969 5.50793C20.1597 4.62136 19.3562 4 18.4384 4L5.56155 4C4.64382 4 3.844 4.62481 3.62085 5.515C2.7815 8.86349 2.0326 11.8016 1.14415 15C0.195501 18.4151 4.14415 21 6.64415 17.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 8.5L18.0111 8.51" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.49 7L16.5011 7.01" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.49 10L16.5011 10.01" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 8.5L15.0111 8.51" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 7V10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.5 8.5H8.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 16C9.10457 16 10 15.1046 10 14C10 12.8954 9.10457 12 8 12C6.89543 12 6 12.8954 6 14C6 15.1046 6.89543 16 8 16Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 16C17.1046 16 18 15.1046 18 14C18 12.8954 17.1046 12 16 12C14.8954 12 14 12.8954 14 14C14 15.1046 14.8954 16 16 16Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>   
              클랜 관리
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content-wrapper">
        {users.map(user =>(
          <section id="tab1-content" className="tab-content" key={user.id}>
            <h2>아이디</h2>
            <p>{user.id}</p>    
            <h2>닉네임</h2>
            <p>{editingUser === user.id ? 
                <input type="text" value={editedNickname !== '' ? editedNickname : user.nickname} onChange={e => setEditedNickname(e.target.value)} /> 
                : user.nickname}</p>
            <h2>연락처</h2>
            <p>{editingUser === user.id ? 
                <input type="text" value={editedPhoneNumber !== '' ? editedPhoneNumber : user.phoneNumber} onChange={e => setEditedPhoneNumber(e.target.value) }  /> 
                : user.phoneNumber}</p>
            <h2>클랜명</h2>
            <p>{user.clanName ? user.clanName : "클랜없음"}</p>
            <h2>회원 가입날짜</h2>
            <p>{user.joinDate}</p>
            {editingUser === user.id ? (
              <button onClick={() => handleEdit(user.id)}>저장</button>
            ) : (
              <button onClick={() => setEditingUser(user.id)}>수정</button>
            )}
            <button>회원탈퇴</button>
          </section>
        ))}
        <section id="tab2-content" className="tab-content">
          <h2>구독 목록</h2>
          <p>
            Gen.g
          </p>
          <p>
            T1
          </p>
          <p>
            DRX
          </p>
        </section>
        {users.map(user => (
          <div key={user.id}>
            {!user.clanBoss ? "" :
              <section id="tab3-content" className="tab-content">
                <h2>클랜원</h2>
                <div className='clanMember'><ClanMember/></div>
                <button>클랜 삭제</button>
              </section>
            }
          </div>
        ))}
        {/* 위부분과 똑같이 작성하면 추가 가능 */}
      </div>
    </div>
  );
}

export default Mypage;
