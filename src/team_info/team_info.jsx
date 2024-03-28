import React,{useState} from 'react';
import './style.css';
import preview from './assets/preview.png'

const team_info = () => {

  // const [isToggle,setIsToggle] = useState(false);

  // const togglebutton = () => {
  //   setIsToggle(!isToggle);
  // }


 return (

     <div className='team-info'>
       <div className='team-info-img'>
         <h1>⭐⭐ 이미지에 팀 로고 넣을 것⭐⭐(DB에서 가져올 것)</h1>
         <img src={preview} alt="Fetch API GraphQL Preview" />
       </div>
       <div className="team-info-text">
         <br></br>
         <h2>⭐⭐ 팀 소개 페이지⭐⭐(DB에서 가져올 것)</h2>
         <h4>
           팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다 팀 상세 소개 페이지 입니다
         </h4>
         <div>
           <br></br>
           <h2>⭐⭐ 선수 소개 ⭐⭐</h2>
           <br></br>
           <h3>임요환, 페이커 그리고 김수종 Let's go(DB에서 가져올 것)</h3>
         </div>
         <div>
           <br></br>
           <h2> ⭐⭐url 연결⭐⭐(DB에서 가져올 것) </h2>
           <br></br>
           <h3>
             팀 공식 홈페이지 url <br></br>
             팀 인스타 url <br></br>
             팀 페이스북 url
           </h3>
         </div>
       </div>
     </div>

 );
};

export default team_info;