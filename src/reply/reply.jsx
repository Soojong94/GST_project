// Reply.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './replystyle.css'; // 댓글 컴포넌트 전용 스타일 시트

const Reply = () => {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/comments');
      setCommentList(response.data);
    } catch (error) {
      console.error('댓글 목록을 불러오는 중 에러가 발생했습니다', error);
    }
  };

  return (
    <div className="comments_section">
      <h3>댓글</h3>
      {commentList.length > 0 ? (
        <ul>
          {commentList.map((comment) => (
            <li key={comment.id} className="comment_item">{comment.text}</li>
          ))}
        </ul>
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default Reply;
