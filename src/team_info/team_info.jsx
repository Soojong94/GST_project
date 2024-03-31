import React, { useState, useEffect } from 'react';
import './style.css';
import preview from './assets/preview.png';
import Sidebar from '../sidebar-02/sidebar';
import '../../src/App.css'
import{useParams} from 'react-router-dom';
import axios from 'axios';


const Team_info = () => {
  const { team_idx } = useParams(); // URL 경로에서 idx 파라미터 가져오기
  const [team, setTeam] = useState(null); // 팀 정보를 저장할 상태
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setIsLoading(true); // Set loading to true at the start of your fetch
        const res = await axios.get(`http://localhost:5000/api/teaminfo/${team_idx}`);
        setTeam(res.data[0]); // 응답받은 팀 정보를 상태에 저장
        setIsLoading(false); // Set loading to false once the data has been set
      } catch (err) {
        console.error('팀 정보를 가져오는 중 에러가 발생했습니다:', err);
        setIsLoading(false); // Also set loading to false in case of error
      }
    };
    fetchTeam();
  }, [team_idx]);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        //const userId = req.session.userId; // 세션에서 아이디 가져오기
        const userId = 'rbsgh0510@gmail.com'
        const res = await axios.get(`http://localhost:5000/api/subscription/${team_idx}/${userId}`);
        const subscription = res.data; // 서버에서 받은 구독 정보
        setIsSubscribed(subscription.isSubscribed); // 구독 정보를 상태에 저장
      } catch (err) {
        console.error('구독 정보를 가져오는 중 에러가 발생했습니다:', err);
      }
    };

    fetchSubscription();
  }, []);
  
  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  
    const subscriptionData = {
      //userId: req.session.userId, // 실제 사용자 아이디로 변경
      userId: 'rbsgh0510@gmail.com',
      teamIdx: team.team_idx,
      isSubscribed: !isSubscribed
    };
  
    // JSON 형식으로 변환된 데이터를 서버에 전송
    fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscriptionData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to toggle subscription');
      }
      console.log('구독 상태가 서버에 전송되었습니다.');
    })
    .catch(error => {
      console.error('Error toggling subscription:', error);
    });
  };

  return (
    <div className='main_container'>
      <Sidebar />
      <div className='team-info'>
        {team && (
          <>
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
          <h2>⭐⭐{team.team_name}⭐⭐</h2>
          <h4>
            팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다
          </h4>
          <div>
            <br />
            <h2>⭐⭐ 선수 소개 ⭐⭐</h2>
            <br />
            <h3>{team.team_players}</h3>
          </div>
          <div>
            <br />
            <h2> ⭐⭐url 연결⭐⭐(DB에서 가져올 것) </h2>
            <br />
            <h3>
              팀 공식 홈페이지 url : {team.team_page_url} <br />
              팀 인스타 url : {team.team_instagram_url}  <br />
              팀 페이스북 url : { team.team_facebook_url}
            </h3>
          </div> 
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Team_info;
