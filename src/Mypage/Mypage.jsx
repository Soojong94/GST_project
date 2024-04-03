import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mypage.css';
import Sidebar from '../sidebar-02/sidebar';
import ClanMember from './ClanMember';
import { C } from '@fullcalendar/core/internal-common';

function Mypage() {


  // 회원 정보를 가져오기
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userinfo = JSON.parse(sessionStorage.getItem("user"))
        console.log('session', userinfo.user_id);
        if (userinfo) {
          const userId = userinfo.user_id;
          const dataSend = { user_id: userId };
          const response = await axios.post('http://localhost:5000/UserInfo', dataSend)
          setUserInfo(response.data[0]);
          console.log(response.data[0]);
        } else {
          console.log('사용자 정보가 없습니다.')
        }
      } catch (error) {
        console.error('회원정보 userid 전달 에러:', error);
      }
    };

    fetchData();
  }, []);

  // 회원 수정 기능
  const [editedNickname, setEditedNickname] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true); // 수정 모드 활성화
  };

  const handleSave = async () => {
    try {
      const updatedUserInfo = { user_nick: editedNickname, user_phone: editedPhoneNumber };
      const userId = JSON.parse(sessionStorage.getItem("user")).user_id; // 세션 스토리지에서 사용자 ID 가져오기
      const response = await axios.post('http://localhost:5000/api/updateUserInfo', { ...updatedUserInfo, user_id: userId });
      console.log(response.data); // 서버로부터의 응답 로그에 출력
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error('서버로 수정된 정보 전송 중 오류 발생:', error);
      // 오류 발생 시 사용자에게 알림을 추가할 수 있습니다.
    }
  };


  // 회원 탈퇴
  const handleDelete = async () => {
    try {
      const userinfo = JSON.parse(sessionStorage.getItem("user"))
      if (userinfo) {
        const userId = userinfo.user_id;
        console.log(userId)
        const confirmed = window.confirm("정말 탈퇴 하시겠습니까?");
        const response = await axios.delete(`http://localhost:5000/api/userDelete/${userId}`);
        console.log('회원 탈퇴 성공:', response.data);
        window.location.reload();
        // 성공적으로 회원 탈퇴한 경우, 사용자 목록에서 해당 사용자를 제거하는 작업 등을 수행할 수 있습니다.
      } else {
        console.log('사용자 정보가 없습니다.')
      }
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      // 회원 탈퇴에 실패한 경우, 사용자에게 알림을 표시하거나 다른 작업을 수행할 수 있습니다.
    }
  };



  // 구독 정보 가져오기
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userinfo = JSON.parse(sessionStorage.getItem("user"))
        if (userinfo) {
          const userId = userinfo.user_id;
          const response = await axios.get(`http://localhost:5000/api/Mypagesubscription/${userId}`)
          setUserSubscriptions(response.data);
          console.log(response.data);
        } else {
          console.log('사용자 정보가 없습니다.')
        }
      } catch (error) {
        console.error('회원 구독정보 전달 에러:', error);
      }
    };

    fetchData();
  }, []);

  // 클랜 삭제 기능
  const handleclanDelete = async () => {
    try {
      const userinfo = JSON.parse(sessionStorage.getItem("user"))
      if (userInfo) {
        const userId = userinfo.user_id;
        console.log(userId)
        const confirmed = window.confirm("정말 클랜을 삭제 하시겠습니까?");
        const response = await axios.delete(`http://localhost:5000/api/ClanDelete/${userId}`);
        console.log('클랜 탈퇴 성공:', response.data);
        // 성공적으로 회원 탈퇴한 경우, 사용자 목록에서 해당 사용자를 제거하는 작업 등을 수행할 수 있습니다.
        window.location.reload();
      } else {
        console.log('사용자 정보가 없습니다.')
      }
    } catch (error) {
      console.error('클랜 탈퇴 실패:', error);
      // 회원 탈퇴에 실패한 경우, 사용자에게 알림을 표시하거나 다른 작업을 수행할 수 있습니다.
    }
  };
  

  



  // 마이페이지 애니메이션 기능
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
    <>
      <div>
        <div><Sidebar /></div>
        <div className="tabs-container" id='tabsContainer'>
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
            <li>

              <div>
                <a id="tab3" title="clan" href="#tab3">
                  <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17.5 17.5C20 21 23.9486 18.4151 23 15C21.5753 9.87113 20.8001 7.01556 20.3969 5.50793C20.1597 4.62136 19.3562 4 18.4384 4L5.56155 4C4.64382 4 3.844 4.62481 3.62085 5.515C2.7815 8.86349 2.0326 11.8016 1.14415 15C0.195501 18.4151 4.14415 21 6.64415 17.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 8.5L18.0111 8.51" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.49 7L16.5011 7.01" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.49 10L16.5011 10.01" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 8.5L15.0111 8.51" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 7V10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.5 8.5H8.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 16C9.10457 16 10 15.1046 10 14C10 12.8954 9.10457 12 8 12C6.89543 12 6 12.8954 6 14C6 15.1046 6.89543 16 8 16Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 16C17.1046 16 18 15.1046 18 14C18 12.8954 17.1046 12 16 12C14.8954 12 14 12.8954 14 14C14 15.1046 14.8954 16 16 16Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  클랜 관리
                </a>
              </div>

            </li>
          </ul>
          <div className="tab-content-wrapper">
            <section id="tab1-content" className="tab-content">
              {userInfo ? (
                <div>
                  <h2>아이디</h2>
                  <p>{userInfo.user_id}</p>
                  <h2>닉네임</h2>
                  {isEditing ? (
                    <input type="text" value={editedNickname} onChange={(e) => setEditedNickname(e.target.value)} />
                  ) : (
                    <p>{userInfo.user_nick}</p>
                  )}
                  <h2>연락처</h2>
                  {isEditing ? (
                    <input type="text" value={editedPhoneNumber} onChange={(e) => setEditedPhoneNumber(e.target.value)} />
                  ) : (
                    <p>{userInfo.user_phone}</p>
                  )}
                  <h2>클랜명</h2>
                  <p>{userInfo.clan}</p>
                  <h2>회원 가입날짜</h2>
                  <p>{userInfo.joined_at}</p>
                </div>
              ) : (<p>loading...</p>)}

              {isEditing ? (
                <button id='MpSave-btn' onClick={handleSave}>저장</button>
              ) : (
                <button id='MpEdit-btn' onClick={handleEdit}>수정</button>
              )}

              <button id='MpDel-btn' onClick={handleDelete}>회원 탈퇴</button>

            </section>

            <section id="tab2-content" className="tab-content">
              {userSubscriptions ? (
                <div>
                  <h2>구독 목록</h2>
                  <ul>
                    {userSubscriptions.map((subscription, index) => (
                      <li key={index}>{subscription.team_name}</li>
                    ))}
                  </ul>
                </div>
              ) : (<h2>구독 목록이 없습니다.</h2>)}
            </section>
            <section id="tab3-content" className="tab-content">
              {userInfo && userInfo.clan_boss === 'y' ? (
                <div>
                  <h2>클랜원</h2>
                  <div className='clanMember'><ClanMember/></div>
                  <button onClick={handleclanDelete}>클랜 삭제</button>
                </div>
              ) : (<h2>클랜이 없습니다.</h2>)}
            </section>
            {/* 위부분과 똑같이 작성하면 추가 가능 */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Mypage;