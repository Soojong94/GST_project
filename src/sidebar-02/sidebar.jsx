import React, { useState, useEffect } from 'react';
import './style.css'; // Assuming your CSS is in the same directory
import logo from '../dashboardImg/KakaoTalk_20240318_165848557_01.png';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const current = window.location.href;
    setActiveLink(current);
  }, []);

  const handleExpandClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  return (
    <nav className={isCollapsed ? 'collapsed' : ''}>
      <div className="sidebar-top">
        <a href="#" className="logo__wrapper">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="hide">Game Schedule Tracker</h1>
        </a>
   
      </div>
      <div className="sidebar-links">
        <ul>
          <li>
            <a href="#dashboard" title="Dashboard" className="tooltip" onClick={() => handleLinkClick('#dashboard')}>
              <CalendarMonthIcon />
              <span className="link hide">캘린더</span>
              
            </a>
          </li>
          <li>
            <a href="#project" title="Project" className="tooltip" onClick={() => handleLinkClick('#project')}>
              <SubscriptionsIcon />
              <span className="link hide">팀 구독 게시판</span>
              
            </a>
          </li>
          <li>
            <a href="#performance" title="Performance" className="tooltip" onClick={() => handleLinkClick('#performance')}>
              <VideogameAssetIcon />
              <span className="link hide">클랜 게시판</span>
              
            </a>
          </li>
          <li>
            <a href="#funds" title="Funds" className="tooltip" onClick={() => handleLinkClick('#funds')}>
              <AnalyticsIcon />
              <span className="link hide">경기 분석 게시판 <br></br>(오픈 예정)</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-links">
          <ul>
            <li>
              <a href="#help" title="Help" className="tooltip" onClick={() => handleLinkClick('#help')}>
                <LogoutIcon />
                <span className="link hide">Logout</span>
                
              </a>
            </li>
            <li>
              <a href="#settings" title="Settings" className="tooltip" onClick={() => handleLinkClick('#settings')}>
                <SettingsIcon />
                <span className="link hide">Settings</span>
                
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
