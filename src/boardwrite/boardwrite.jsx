import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BoardWrite.css';

function BoardWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null); // userId 상태 추가

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/session');
      const sessionData = response.data;
  
      // 가져온 세션 데이터를 사용하여 userId 상태를 업데이트합니다.
      setUserId(sessionData.user_id);
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

  const insertBoard = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userId', userId);

      if (file) {
        formData.append('file', file);
      }

      await axios.post('http://localhost:5000/api/boardInsert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 성공 후 처리 로직 추가
    } catch (error) {
      console.error('Error inserting board:', error);
      // 오류 처리 로직 추가
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await insertBoard();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={handleTitleChange} placeholder="제목" />
      <textarea value={content} onChange={handleContentChange} placeholder="내용" />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">게시글 등록</button>
    </form>
  );
}

export default BoardWrite;