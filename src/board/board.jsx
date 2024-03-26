import React from 'react';
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

function TeamSubscCard({ imgSrc, altText, title, content }) {
  return (
    <article>
      <figure>
        <img src={imgSrc} alt={altText} />
      </figure>
      <div className="article-preview">
        <h2>{title}</h2>
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
      title: "게시판1",
      content: "게시판1 내용"
    },
    {
      imgSrc: DK,
      altText: "Snowy Mountains",
      title: "게시판2",
      content: "게시판2 내용"
    },
    {
      imgSrc: DRX,
      altText: "Wooden Bridge",
      title: "게시판3",
      content: "게시판3 내용"
    },
    {
      imgSrc: T1,
      altText: "Autumn Forest",
      title: "게시판4",
      content: "게시판4 내용"
    },
    {
      imgSrc: NS,
      altText: "Freezing Forest",
      title: "게시판5",
      content: "게시판5 내용"
    },
    {
      imgSrc: Fearx,
      altText: "Fearx",
      title: "게시판6",
      content: "게시판6 내용"
    },
    {
      imgSrc: GenG,
      altText: "GenG",
      title: "게시판7",
      content: "게시판7 내용"
    },
    {
      imgSrc: HLE,
      altText: "Hanwha Life Esports",
      title: "게시판8",
      content: "게시판8 내용"
    },
    {
      imgSrc: KDF,
      altText: "Kwangdong Freecs",
      title: "게시판9",
      content: "게시판9 내용"
    },
    {
      imgSrc: KT,
      altText: "KT Rolster",
      title: "게시판10",
      content: "게시판10 내용"
    },
    {
      imgSrc: BRO,
      altText: "Lavender Fields",
      title: "게시판1",
      content: "게시판1 내용"
    },
    {
      imgSrc: DK,
      altText: "Snowy Mountains",
      title: "게시판2",
      content: "게시판2 내용"
    },
    {
      imgSrc: DRX,
      altText: "Wooden Bridge",
      title: "게시판3",
      content: "게시판3 내용"
    },
    {
      imgSrc: T1,
      altText: "Autumn Forest",
      title: "게시판4",
      content: "게시판4 내용"
    },
    {
      imgSrc: NS,
      altText: "Freezing Forest",
      title: "게시판5",
      content: "게시판5 내용"
    },
    {
      imgSrc: Fearx,
      altText: "Fearx",
      title: "게시판6",
      content: "게시판6 내용"
    },
    {
      imgSrc: GenG,
      altText: "GenG",
      title: "게시판7",
      content: "게시판7 내용"
    },
    {
      imgSrc: HLE,
      altText: "Hanwha Life Esports",
      title: "게시판8",
      content: "게시판8 내용"
    },
    {
      imgSrc: KDF,
      altText: "Kwangdong Freecs",
      title: "게시판9",
      content: "게시판9 내용"
    },
    {
      imgSrc: KT,
      altText: "KT Rolster",
      title: "게시판10",
      content: "게시판10 내용"
    },
    
   
    
  ];

  return (
    <div className="articles">
      {teams.map((team, index) => (
        <TeamSubscCard
          key={index}
          imgSrc={team.imgSrc}
          altText={team.altText}
          title={team.title}
          content={team.content}
        />
      ))}
    </div>
  );
}

export default TeamSubsc;
