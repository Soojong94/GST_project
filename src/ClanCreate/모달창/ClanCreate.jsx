import axios from 'axios';
import React from 'react';


export function ClanCreate() {
 
  const handleRegister = () => {
    const clanName = document.getElementById('clanName-input').value;
    const clanIntro = document.getElementById('clanText').value;
    const clanMembers = document.getElementById('clanMembers').value;
    const clanImage = document.getElementById('clanImage').value; // 이미지 경로 추가
    
    const clanData = {
      clanName: clanName,
      clanIntro: clanIntro,
      clanMembers: clanMembers,
      clanImage: clanImage // 이미지 경로 추가
    };
    
    console.log("클랜 데이터:", clanData);
    console.log("클랜 데이터(JSON):", JSON.stringify(clanData));
    
    const clanCreateData = JSON.stringify(clanData);
    axios.post('http://localhost:5000/api/ClanCreate', clanCreateData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Data sent successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error sending data:', error);
    });

  };
  return (
    <div>
      <div id='clanCreate-content'>
              <div id='clanCreateNames'>
                <h2 className='clanCreateTitle'>클랜 이름</h2>
                <div className='clanCreate-inputs'>
                  <input id='clanName-input'></input>
                </div>
              </div>
              <div id='clanCreateText'>
                <h2 className='clanCreateTitle'>클랜 소개글</h2>
                <div className='clanCreate-inputs'>
                  <textarea id='clanText'></textarea>
                </div>
              </div>
              <div id='clanCreateFiles'>
                <h3 className='clanCreateTitle'>사진 첨부</h3>
                <input type='file' id='clanImage'></input>
              </div>
              <div>
                <h3>인원 제한</h3>
                <select id='clanMembers'>
                  <option value="10">10명</option>
                  <option value="20">20명</option>
                  <option value="30">30명</option>
                  <option value="40">40명</option>
                  <option value="50">50명</option>
                </select>
              </div>
              <div id='clanCreateButtons'>
                <button id='clanCreateSub-Btn' onClick={handleRegister}>등록</button>
              </div>
            </div>
      </div>
  );
}

export default ClanCreate;