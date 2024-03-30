import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BoardWrite.css';

function BoardWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null); // userId 상태 추가

  // 세션 정보 가져오는 함수
  const fetchSession = async () => {
    try {
      const response = await axios.get('/api/user/session');
      const userIdFromSession = response.data.userId;
      setUserId(userIdFromSession); // userId 상태 업데이트
    } catch (error) {
      console.error('세션 정보 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

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

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('userId', userId); // userId를 formData에 추가

    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('/api/board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      handleSuccess(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSuccess = (data) => {
    console.log(data);
    // 성공 후 처리 로직 추가
  };

  const handleError = (error) => {
    console.error(error);
    // 오류 처리 로직 추가
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
