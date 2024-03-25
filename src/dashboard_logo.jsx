import React from 'react';
import dashboardImage from './dashboardImg/KakaoTalk_20240318_165848557.png'; 
import dashboardImage2 from './dashboardImg/KakaoTalk_20240318_165848557_01.png'; 
import './App.css';

export default function GSTMenu() {
  return (
    <div>
      <a href='#' className='menu-link'>
        <img id='gst_logo' src={dashboardImage2} alt="Dashboard Image" />
      </a>
    </div>
  );
}
