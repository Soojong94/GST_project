// BoardWrite.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './BoardWrite.css'; // CSS 파일 임포트

const BoardWrite = () => {
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      file: null
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        file: e.target.files[0]
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }
  
      try {
        await axios.post('/api/boardInsert', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('글이 성공적으로 등록되었습니다.');
        // 성공 후 페이지 이동 또는 상태 초기화 등의 처리
      } catch (error) {
        console.error('글 등록 중 에러가 발생했습니다', error);
        alert('글 등록에 실패했습니다.');
      }
    };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            제목:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            내용:
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            파일:
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <button type="submit">글 등록</button>
      </form>
    </div>
  );
};

export default BoardWrite;
