import React, { useState, useEffect } from 'react';
import './style.css';
import Sidebar from '../sidebar-02/sidebar';
import '../../src/App.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../team_subsc/logo/T1.PNG'
import logo2 from '../team_subsc/logo/GenG.PNG'
import logo3 from '../team_subsc/logo/DK.PNG'
import logo4 from '../team_subsc/logo/HLE.PNG'
import logo5 from '../team_subsc/logo/KT.PNG'
import logo6 from '../team_subsc/logo/DRX.PNG'
import logo7 from '../team_subsc/logo/NS.PNG'
import logo8 from '../team_subsc/logo/Fearx.PNG'
import logo9 from '../team_subsc/logo/KDF.PNG'
import logo10 from '../team_subsc/logo/BRO.PNG'

const Team_info = () => {
  const { team_idx } = useParams();
  const [team, setTeam] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:5000/api/teaminfo/${team_idx}`);
        setTeam(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error('팀 정보를 가져오는 중 에러가 발생했습니다:', err);
        setIsLoading(false);
      }
    };
    fetchTeam();
  }, [team_idx]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const userinfo = JSON.parse(sessionStorage.getItem("user"))
            if (userinfo) {
                const userId = userinfo.user_id;
                const dataSend = { user_id: userId };
                const response = await axios.post('http://localhost:5000/UserInfo', dataSend)
                console.log(response.data[0]);

                // Set userId state
                setUserId(userId);
            } else {
                console.log('사용자 정보가 없습니다.')
            }
        } catch (error) {
            console.error('회원정보 userid 전달 에러:', error);
        }
    };

    fetchData();
}, []);

useEffect(() => {
  const fetchSubscription = async () => {
      try {
          const resSub = await axios.post(`http://localhost:5000/api/subscription`, { user_id: userId, team_idx: team_idx });
          const subscription = resSub.data;

          // Check if the user is subscribed to this team
          setIsSubscribed(subscription.length > 0);
      } catch (err) {
          console.error('구독 정보를 가져오는 중 에러가 발생했습니다:', err);
      }
  };

  if (userId) {
      fetchSubscription();
  }
}, [team_idx, userId]);


  const toggleSubscription = async () => {
    setIsSubscribed(!isSubscribed);
  
    const subscriptionData = {
      userId: userId,
      teamIdx: team_idx,
      isSubscribed: !isSubscribed
    };
  
    try {
      await axios.post('http://localhost:5000/api/subscribe', subscriptionData); // 수정된 경로로 변경
      console.log('구독 상태가 서버에 전송되었습니다.');
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };

  // Mapping team indexes to logo addresses
  const teamLogoPaths = {
    1: logo1,
    2: logo2,
    3: logo3,
    4: logo4,
    5: logo5,
    6: logo6,
    7: logo7,
    8: logo8,
    9: logo9,
    10: logo10
  };

  return (
    <body id="all" >
      
    <div id='signUp_main_TI' className='main_container_TI'>
      <Sidebar />
      <div id='team-info' className='team-info'>
        {team && (
          <>
            <div id='team-info-img' className='team-info-img'>
  
              <img src={teamLogoPaths[team_idx]} alt='Fetch API GraphQL Preview' style={{ width: '300px' }} />
            </div>
  
              <div className='subscribe-area'>
              <button
    className={`subscribe-button ${isSubscribed ? 'subscribed' : ''}`}
    onClick={toggleSubscription}
>
    {isSubscribed ? '구독중' : '구독'}
</button>
              </div>
            <div id='team-info-text' className='team-info-text'>
              <br />
              <h2>⭐⭐{team.team_name}⭐⭐</h2>
              <h4 style={{ whiteSpace: 'pre-line' }}>
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
                <h2> ⭐⭐⭐⭐⭐⭐ </h2>
                <br />
                <h3>
                  팀 공식 홈페이지 url:
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
        </body>
  );
        }
export default Team_info;