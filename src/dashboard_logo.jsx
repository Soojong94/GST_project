import React from 'react';
import dashboardImage from './dashboardImg/KakaoTalk_20240318_165848557.png'; 
import './dashboard_logo.css';

export default function GSTMenu() {
  return (
    <a href='#' className='menu-link'>
      <img className='gst-menu' src={dashboardImage} alt="Dashboard Image" />
    </a>
  );
}
