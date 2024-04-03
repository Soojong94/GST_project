import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BRO from '../team_subsc/logo/BRO.PNG';
import DK from '../team_subsc/logo/DK.PNG';
import DRX from '../team_subsc/logo/DRX.PNG';
import T1 from '../team_subsc/logo/T1.PNG';
import NS from '../team_subsc/logo/NS.PNG';
import Fearx from '../team_subsc/logo/Fearx.PNG';
import GenG from '../team_subsc/logo/GenG.PNG';
import HLE from '../team_subsc/logo/HLE.PNG';
import KDF from '../team_subsc/logo/KDF.PNG';
import KT from '../team_subsc/logo/KT.PNG';
import './style.css'
import Sidebar from '../sidebar-02/sidebar';
import '../../src/App.css'



const teamImageMap = {
  1: T1,
  2: GenG,
  3: DK,
  4: HLE,
  5: KT,
  6: DRX,
  7: NS,
  8: KDF,
  9: Fearx,
  10:BRO
};

function TeamSubscCard({ teamIdx, altText, title, content, link }) {
  const imgSrc = teamImageMap[teamIdx];
  const navigate = useNavigate(); // useNavigate 훅 사용하여 navigate 함수 가져오기

  const handleClick = () => {
    if (link) {
      navigate(link); // 클릭 시 지정된 링크로 이동
    }
  }

  return (

    <article onClick={handleClick}>
      <figure id='team_logo'>
        <img id="team_logo_img" src={imgSrc} alt={altText} />
      </figure>
      <div className="article-preview_LG">
        <h2 >{title}</h2>
        <p>{content}</p>
      </div>
    </article>

  );
}
function TeamSubsc() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get('/api/teams'); // 서버의 경로에 맞게 수정
        const teamWithImages = res.data.map((team) => ({
          ...team,
          imgSrc: teamImageMap[team.team_idx],
          link: `/Teaminfo/${team.team_idx}`,
          fontSize: team.fontSize + 2 // 폰트 크기에 2씩 더해주기
        }));
        setTeams(teamWithImages);
      } catch (err) {
        console.error('팀 정보를 가져오는 중 에러가 발생했습니다:', err);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className='main_container'>
      <Sidebar />
      <div className='main_calendar'></div>
      <div className="articles" id="team_subsc">
        {teams.map((team) => (
          <TeamSubscCard
            key={team.team_idx}
            teamIdx={team.team_idx}
            imgSrc={team.imgSrc}
            altText={team.team_player}
            title={team.team_name}
            content={team.team_profile}
            link={team.link}
            fontSize={team.fontSize} // 수정된 폰트 크기를 전달
          />
        ))}
      </div>
    </div>
  );
}

export default TeamSubsc;
