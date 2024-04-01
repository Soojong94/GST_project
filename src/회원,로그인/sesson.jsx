import React, { useState, useEffect } from 'react';

function SessionCheckButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 세션 스토리지 확인
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // 예시로 'true'를 저장하여 로그인 상태를 모방합니다.
    sessionStorage.setItem('userSession', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // 세션 스토리지에서 로그인 정보 삭제
    sessionStorage.removeItem('userSession');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {/* 로그인 상태에 따라 버튼 표시 변경 */}
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      <p>{isLoggedIn ? 'Logged in' : 'Logged out'}</p>
    </div>
  );
}

export default SessionCheckButton;
