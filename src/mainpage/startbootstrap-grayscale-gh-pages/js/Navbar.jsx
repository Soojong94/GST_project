// Navbar.js

// 리액트에서 필요한 모듈을 가져옵니다.
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// mainpage_logo 이미지를 가져옵니다.
import mainpage_logo from '../../../signin_page/GST_logo.png'

// 네비게이션 바 컴포넌트를 만듭니다.
const Navbar = ({ signup, login }) => {
  // 네비게이션 바가 줄어든 상태인지를 추적하는 상태를 만듭니다.
  const [isShrinked, setIsShrinked] = useState(false);

  // 스크롤 이벤트를 처리하고 줄어든 상태를 업데이트하는 효과 훅을 사용합니다.
  useEffect(() => {
    // 네비게이션 바가 줄어들어야 하는지를 확인하는 함수를 만듭니다.
    const checkIfShrinked = () => {
      setIsShrinked(window.scrollY > 0); // 스크롤 위치에 따라 줄어든 상태를 설정합니다.
    };

    // 컴포넌트가 마운트될 때 네비게이션 바가 줄어들어야 하는지 확인합니다.
    checkIfShrinked();

    // 스크롤 이벤트 리스너를 추가하여 줄어든 상태를 업데이트합니다.
    document.addEventListener('scroll', checkIfShrinked);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener('scroll', checkIfShrinked);
    };
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  // 네비게이션 바 컴포넌트의 JSX를 반환합니다.
  return (
    <nav className={`navbar navbar-expand-lg navbar-light fixed-top py-1 ${isShrinked ? 'navbar-shrink' : ''}`} id="mainNav">
      <div class="container-fluid px-0" style="margin-top: 5px; margin-bottom: 5px;">
    <a class="navbar-brand" href="/">
        <img id="mainpage_logo" src="/static/media/GST_logo.36dc6c29.png" alt="Main Logo" width="80" height="300"/>
    </a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
            <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
            <li class="nav-item"><a class="nav-link" href="/Signup">Join</a><br>with Google</li>
            <li class="nav-item"><a class="nav-link" href="/SignIn">Login</a><br>with Google</li>
            <li><a class="btn btn-primary" href="/calendar">GST Start</a></li>
        </ul>
    </div>
</div>

    </nav>
  );
};

// 네비게이션 바 컴포넌트를 기본으로 내보냅니다.
export default Navbar;
