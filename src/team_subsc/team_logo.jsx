import React from 'react';
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




function TeamSubscCard({ imgSrc, altText, title, content, link }) {

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
      <div className="article-preview">
        <h2 >{title}</h2>
        <p>{content}</p>
      </div>
    </article>

  );
}

function TeamSubsc() {
  const teams = [
    {
      imgSrc: BRO,
      altText: "Lavender Fields",
      title: "BRION",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent in mauris eu tortor porttitor accumsan.",
      link: "/Teaminfo"// 여기에 인덱스 까지 추가하면 팀에 맞는 경로로 들어가짐
    },
    {
      imgSrc: DK,
      altText: "Snowy Mountains",
      title: "Dplus KIA",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent in mauris eu tortor porttitor accumsan.",
      link : "/Teaminfo"
      
    },
    {
      imgSrc: DRX,
      altText: "Wooden Bridge",
      title: "DRX",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent in mauris eu tortor porttitor accumsan."
    },
    {
      imgSrc: T1,
      altText: "Autumn Forest",
      title: "T1",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent in mauris eu tortor porttitor accumsan."
    },
    {
      imgSrc: NS,
      altText: "Freezing Forest",
      title: "Nongshim Red Force",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent in mauris eu tortor porttitor accumsan."
    },
    {
      imgSrc: Fearx,
      altText: "Fearx",
      title: "FearX",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent in mauris eu tortor porttitor accumsan."
    },
    {
      imgSrc: GenG,
      altText: "GenG",
      title: "GenG",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent in mauris eu tortor porttitor accumsan."
    },
    {
      imgSrc: HLE,
      altText: "Hanwha Life Esports",
      title: "Hanwha Life Esports",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent in mauris eu tortor porttitor accumsan."
    },
    {
      imgSrc: KDF,
      altText: "Kwangdong Freecs",
      title: "Kwangdong Freecs",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent in mauris eu tortor porttitor accumsan."
    },
    {
      imgSrc: KT,
      altText: "KT Rolster",
      title: "KT Rolster",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent in mauris eu tortor porttitor accumsan."
    }
  ];

  return (
    <div className='main_container'>
      <Sidebar />
      <div className='main_calendar'></div>
      <div className="articles" id="team_subsc">
        {teams.map((team, index) => (
          <TeamSubscCard
            key={index}
            imgSrc={team.imgSrc}
            altText={team.altText}
            title={team.title}
            content={team.content}
            link={team.link}
          />
        ))}
      </div>
    </div>

  );
}

export default TeamSubsc;
