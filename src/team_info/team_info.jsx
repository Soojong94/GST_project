import React, { useState, useEffect } from 'react';
import './style.css';
import preview from './assets/preview.png';
import logo from '../team_subsc/logo//T1.PNG';
import Sidebar from '../sidebar-02/sidebar';
import '../../src/App.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Team_info = () => {
  const { team_idx } = useParams(); // URL 경로에서 idx 파라미터 가져오기
  const [team, setTeam] = useState(null); // 팀 정보를 저장할 상태
  const [isSubscribed, setIsSubscribed] = useState(null); // 구독 상태를 저장할 상태
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

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
        const res = await axios.get(`http://localhost:5000/session`, { withCredentials: true });
        setUserId(res.data.user_id);

        const resSub = await axios.get(`http://localhost:5000/api/subscription/${team_idx}/${res.data.user_id}`);
        const subscription = resSub.data; // 서버에서 받은 구독 정보
        setIsSubscribed(subscription.isSubscribed); // 구독 정보를 상태에 저장
      } catch (err) {
        console.error('구독 정보를 가져오는 중 에러가 발생했습니다:', err);
      }
    };

    fetchSubscription();
  }, [team_idx]);

  const toggleSubscription = async () => {
    setIsSubscribed(!isSubscribed);

    const subscriptionData = {
      userId: userId,
      teamIdx: team.team_idx,
      isSubscribed: !isSubscribed
    };

    try {
      await axios.post('/api/subscribe', subscriptionData);
      console.log('구독 상태가 서버에 전송되었습니다.');
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };

  return (
    <div className='main_container'>
      <Sidebar />
      <div className='team-info'>
        {team && (
          <>
            <div className='team-info-img' >
              <div className='subscribe-area'>
                <button
                  className={`subscribe-button ${isSubscribed ? 'subscribed' : ''}`}
                  onClick={toggleSubscription}
                >
                  {isSubscribed ? '구독중' : '구독'}
                </button>
              </div>
              {/* Apply CSS styles to center the logo and increase its size */}
              <img src={logo} alt='Fetch API GraphQL Preview' style={{ width: '300px' }} />
            </div>

            <div className='team-info-text'>
              <br />
              <h2>⭐⭐{team.team_name}⭐⭐</h2>
              <h4>
                {team.team_profile}
              </h4>
              <div>
                <br />
                <h2>⭐⭐ 선수 소개 ⭐⭐</h2>
                <br />
                <h3>{team.team_players}</h3>
              </div>
              <div>
                <br />
                <h2> ⭐⭐url 연결⭐⭐ ⭐⭐ </h2>
                <br />
                <h3>
                  팀 공식 홈페이지 url:
                  {/* team.team_page_url를 href에 동적으로 설정 */}
                  <a href={team.team_page_url}>Team website</a>
                  <br />
                  팀 인스타 url : <a href={team.team_instagram_url}>Team instagram</a>
                  <br />
                  팀 페이스북 url: <a href={team.team_facebook_url}>Team facebook</a>
                  <br />
                  중계방 아프리카 url: <a href="https://www.afreecatv.com/total_search.html?szLocation=main&szSearchType=total&szKeyword=%EB%A6%AC%EA%B7%B8%EC%98%A4%EB%B8%8C%EB%A0%88%EC%A0%84%EB%93%9C&szStype=di&szActype=&has_hint=false&pk_cnt=0">아프리카 중계방</a>
                  <br />
                  중계방 치지직 url: <a href="https://chzzk.naver.com/search?query=%EB%A6%AC%EA%B7%B8%20%EC%98%A4%EB%B8%8C%20%EB%A0%88%EC%A0%84%EB%93%9C">치지직 중계방</a>


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