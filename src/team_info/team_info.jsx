import React, { useState } from 'react';
import './style.css';
import preview from './assets/preview.png';
import Sidebar from '../sidebar-02/sidebar';
import '../../src/App.css'

const Team_info = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);


    const subscriptionData = {
      isSubscribed: !isSubscribed
    };
    // 실제 사용할 땐 아래 주석을 해제하고 콘솔 로그 2줄 삭제
    console.log('구독 상태가 서버에 전송되었습니다.');
    console.log(subscriptionData);

    //  // JSON 형식으로 변환된 데이터를 서버에 전송
    //   fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(subscriptionData)
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Failed to toggle subscription');
    //     }
    //     console.log('구독 상태가 서버에 전송되었습니다.');
    //   })
    //   .catch(error => {
    //     console.error('Error toggling subscription:', error);
    //   });
    // };
  };

  return (
    <div className='main_container'>
      <Sidebar />
      <div className='team-info'>
        <div className='team-info-img'>
          <div className='subscribe-area'>
            <button
              className={`subscribe-button ${isSubscribed ? 'subscribed' : ''}`}
              onClick={toggleSubscription}>
              {!isSubscribed ? '구독' : '구독중'}
            </button>
          </div>
          <img src={preview} alt='Fetch API GraphQL Preview' />
        </div>
        <div className='team-info-text'>
          <br />
          <h2>⭐⭐ 팀 소개 페이지⭐⭐(DB에서 가져올 것)</h2>
          <h4>
            팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다
          </h4>
          <div>
            <br />
            <h2>⭐⭐ 선수 소개 ⭐⭐</h2>
            <br />
            <h3>임요환, 페이커 그리고 김수종 Let's go(DB에서 가져올 것)</h3>
          </div>
          <div>
            <br />
            <h2> ⭐⭐url 연결⭐⭐(DB에서 가져올 것) </h2>
            <br />
            <h3>
              팀 공식 홈페이지 url <br />
              팀 인스타 url <br />
              팀 페이스북 url
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Team_info;
