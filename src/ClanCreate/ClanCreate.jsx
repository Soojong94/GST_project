import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import './ClanCreate.css';
import Sidebar from '../sidebar-02/sidebar';

function ClanCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userCount, setUserCount] = useState(10);

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/session');
      const sessionData = response.data;

      setUserId(sessionData.user_id);
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userId', userId);
      formData.append('userCount', userCount);

      if (file) {
        formData.append('file', file);
      }

      await axios.post('http://localhost:5000/api/boardInsert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('클랜 생성 및 게시글 삽입이 완료되었습니다.');
      window.location.href = 'http://localhost:3000/ClanBoard';
    } catch (error) {
      console.error('Error inserting board:', error);
      alert('클랜 생성 및 게시글 삽입에 실패하였습니다.');
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="clanCreate-container">
       <Sidebar id="sidebar_CC"/>
      <div className="clanCreate-content">
        <div className="clanCreateNames">
          <h2 className="clanCreateTitle">클랜 이름</h2>
          <div className="clanCreate-inputs">
            <TextField
              id="clanName-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              size="small"
            />
          </div>
        </div>
        <div className="clanCreateText">
          <h2 className="clanCreateTitle">클랜 소개글</h2>
          <div className="clanCreate-inputs">
            <textarea
              id="clanText"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <div className="clanCreateFiles">
          <h3 className="clanCreateTitle">사진 첨부</h3>
          <input type="file" id="clanImage" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div>
          
          <h3>인원 제한</h3>
          <Select
            id="clanMembers"
            value={userCount}
            onChange={(e) => setUserCount(e.target.value)}
            variant="outlined"
           
          >
            <MenuItem value={10}>10명</MenuItem>
            <MenuItem value={20}>20명</MenuItem>
            <MenuItem value={30}>30명</MenuItem>
            <MenuItem value={40}>40명</MenuItem>
            <MenuItem value={50}>50명</MenuItem>
          </Select>
          
          <br></br>
          
          <Button
            id="clanCreateSub-Btn"
            onClick={handleRegister}
            variant="contained">
            등록
          </Button>
          <Button
            id="clanCreateBack-Btn"
            onClick={handleGoBack}
            variant="contained"
          >
            뒤로 가기
          </Button>
        </div>
        <div className="clanCreateButtons">
        </div>
      </div>
    </div>
  );
}

export default ClanCreate;