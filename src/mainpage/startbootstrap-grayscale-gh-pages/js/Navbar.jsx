import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mainpage_logo from '../../../signin_page/GST_logo.png';
import axios from 'axios';

const Navbar = ({ signup, login }) => {
  const [isShrinked, setIsShrinked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkIfShrinked = () => {
      if (window.scrollY === 0) {
        setIsShrinked(false);
      } else {
        setIsShrinked(true);
      }
    };

    checkIfShrinked();
    document.addEventListener('scroll', checkIfShrinked);

    return () => {
      document.removeEventListener('scroll', checkIfShrinked);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/session');
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout'); // 로그아웃을 처리하는 API 엔드포인트 호출
      setUser(null); // 사용자 정보를 초기화하여 로그아웃 상태로 변경
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-md navbar-light fixed-top ${isShrinked ? 'navbar-shrink' : ''}`} id="mainNav" style={{ width: '100%', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <div className="container-fluid px-4 px-lg-5">
          <a className="navbar-brand" href="/">
            <img id="mainpage_logo" src={mainpage_logo} alt="Logo" />
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            onClick={handleMenuToggle}
            aria-label="Toggle navigation"
          >
            Menu <i className="fas fa-bars"></i>
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects">
                  Projects
                </a>
              </li>

              <>
                <li className="nav-item">
                  <Link to="/Signup" className="nav-link" onClick={signup}>
                    <span className="link-text">Join</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/SignIn" className="nav-link" onClick={login}>
                    <span className="link-text">Login</span>
                  </Link>
                </li>
              </>

              <li className="nav-item">
                <Link to="/calendar" className="nav-link">
                  <button className="btn btn-primary"><span id="top_btn">GST Start</span></button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
