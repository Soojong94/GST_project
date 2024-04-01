import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './style.css'; 
import logo from '../signin_page/GST_logo.png';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [user, setUser] = useState(null); // 사용자 정보를 저장하는 상태
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  const handleLogout = () => {
    axios.post('http://localhost:5000/logout')
      .then(response => {
        if (response.status === 200) {
          setUser(null); // 로그아웃 성공 시 사용자 정보를 초기화합니다.
          sessionStorage.removeItem("user"); // sessionStorage에서 사용자 정보를 제거합니다.
          navigate('/'); // 홈페이지로 이동합니다.
        } else {
          console.log('Logout failed');
        }
      })
      .catch(error => {
        console.log('Error occurred during logout', error);
      });
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
              <Link to="/Mainpage" title="Logout"  onClick={handleLogout}>
                <LogoutIcon />
                <span className="link hide">로그아웃</span>
              </Link>
            </li>
            <li>
              <Link to="/Mypage" title="Mypage"  onClick={() => handleLinkClick('/Mypage')}>
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
