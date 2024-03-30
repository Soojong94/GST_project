import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentWrite from './CommentWrite';
import './commentStyle.css'; // 스타일 시트 임포트

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  // 댓글을 불러오는 함수
  const fetchComments = async () => {
    try {
      // postId를 사용해 해당 게시글의 댓글 정보를 요청합니다.
      const response = await axios.get(`/api/comments/${postId}`);
      // 응답 데이터로부터 댓글 목록을 상태로 설정합니다.
      setComments(response.data);
    } catch (error) {
      console.error('댓글을 불러오는 중 에러가 발생했습니다.', error);
    }
  };

  // 댓글 목록을 업데이트하는 함수
  const updateComments = () => {
    fetchComments();
  };

  return (
    <div className="comments-section">
      <CommentWrite postId={postId} updateComments={updateComments} />
      <div className="comments-list">
        {/* 댓글 목록을 순회하며 각 댓글을 렌더링합니다. */}
        {comments.map((comment) => (
          // 각 댓글에는 user_nick, created_at, cmt_content 정보가 표시됩니다.
          <div key={comment.id} className="comment-item">
            <div className="comment-user">{comment.user_nick}</div>
            <div className="comment-content">{comment.cmt_content}</div>
            <div className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
