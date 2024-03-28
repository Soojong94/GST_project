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
        <Link to="/" className="logo__wrapper">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="hide">Game Schedule Tracker</h1>
        </Link>
      </div>
      <div className="sidebar-links">
        <ul>
          <li>
            <Link to="/Calendar" title="Dashboard" className={`tooltip ${activeLink === '/Calendar' ? 'active' : ''}`} onClick={() => handleLinkClick('/Calendar')}>
              <CalendarMonthIcon />
              <span className="link hide">캘린더</span>
            </Link>
          </li>
          <li>
            <Link to="/TeamSubscriptions" title="Project" className={`tooltip ${activeLink === '/TeamSubscriptions' ? 'active' : ''}`} onClick={() => handleLinkClick('/TeamSubscriptions')}>
              <SubscriptionsIcon />
              <span className="link hide">팀 구독 게시판</span>
            </Link>
          </li>
          <li>
            <Link to="/ClanBoard" title="Performance" className={`tooltip ${activeLink === '/ClanBoard' ? 'active' : ''}`} onClick={() => handleLinkClick('/ClanBoard')}>
              <VideogameAssetIcon />
              <span className="link hide">클랜 게시판</span>
            </Link>
          </li>
          <li>
            <Link to="/Analysis" title="Analysis" className={`tooltip ${activeLink === '/funds' ? 'active' : ''}`} onClick={() => handleLinkClick('/Analysis')}>
              <AnalyticsIcon />
              <span className="link hide">경기 분석 게시판 <br></br>(오픈 예정)</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-links">
          <ul>
            <li>
              <Link to="/Logout" title="Logout" className={`tooltip ${activeLink === '/help' ? 'active' : ''}`} onClick={() => handleLinkClick('/Logout')}>
                <LogoutIcon />
                <span className="link hide">Logout</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" title="Settings" className={`tooltip ${activeLink === '/settings' ? 'active' : ''}`} onClick={() => handleLinkClick('/settings')}>
                <SettingsIcon />
                <span className="link hide">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
