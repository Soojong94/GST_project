import React, { useState } from 'react';
import axios from 'axios';
import './BoardWrite.css';

function BoardWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

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
    // 성공 후 처리 로직 추가 (폼 초기화, 성공 메시지 표시, 페이지 리다이렉션 등)
  };

  const handleError = (error) => {
    console.error(error);
    // 오류 처리 로직 추가 (알림 표시, 에러 메시지 표시 등)
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