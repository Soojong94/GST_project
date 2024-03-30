import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css'; 
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

  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  return (
    <nav className={isCollapsed ? 'collapsed' : ''}>
      <div className="sidebar-top">
        <Link to="/Calendar" className="logo__wrapper">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="hide">Game Schedule Tracker</h1>
        </Link>
      </div>
      <div className="sidebar-links">
        <ul>
          <li>
            <Link to="/Calendar" title="Dashboard"  onClick={() => handleLinkClick('/Calendar')}>
              <CalendarMonthIcon />
              <span className="link hide">캘린더</span>
            </Link>
          </li>
          <li>
            <Link to="/TeamSubscriptions" title="Project"  onClick={() => handleLinkClick('/TeamSubscriptions')}>
              <SubscriptionsIcon />
              <span className="link hide">팀 구독 게시판</span>
            </Link>
          </li>
          <li>
            <Link to="/ClanBoard" title="Performance" onClick={() => handleLinkClick('/ClanBoard')}>
              <VideogameAssetIcon />
              <span className="link hide">클랜 게시판</span>
            </Link>
          </li>
     
          <li>
            <Link title="freeBoard" >
              <AnalyticsIcon />
              <span className="link hide">자유 게시판<br></br>(오픈 예정)</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-links">
          <ul>
            <li>
              <Link to="/Logout" title="Logout"  onClick={() => handleLinkClick('/Logout')}>
                <LogoutIcon />
                <span className="link hide">로그아웃</span>
              </Link>
            </li>
            <li>
              <Link to="/Mypage" title="Mypage" className={`tooltip ${activeLink === '/Mypage' ? 'active' : ''}`} onClick={() => handleLinkClick('/Mypage')}>
                <SettingsIcon />
                <span className="link hide">세팅</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
