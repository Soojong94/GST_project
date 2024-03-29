import React, { useState } from 'react';
import axios from 'axios';
import './CommentWrite.css'; // 스타일 시트 임포트
const CommentWrite = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const [message, setMessage] = useState(''); // 메시지 상태 추가

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
    setMessage(''); // 입력 시 오류 메시지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setMessage('댓글 내용을 입력해주세요.'); // 경고 대신 메시지 상태 업데이트
      return;
    }

    // 현재시간 생성
    const created_at = new Date().toISOString();

    // 서버로 넘길 댓글 데이터
    const commentData = {
      b_idx: postId, // 여기서 b_idx는 postId를 통해 전달됩니다. postId는 게시글의 고유 식별자입니다.
      cmt_content: commentText, // 사용자가 입력한 댓글 내용
      created_at, // 댓글이 생성된 현재 시간
      // user_id는 서버 측에서 세션을 통해 처리합니다. 클라이언트에서는 전송하지 않습니다.
    };

    try {
      await axios.post('/api/commentInsert', commentData);
      setMessage('댓글이 성공적으로 등록되었습니다.'); // 성공 메시지 표시
      setCommentText(''); // 댓글 등록 후 입력 필드 초기화
      // updateComments(); // 댓글 목록을 업데이트하는 로직이 필요하다면 여기에 추가
    } catch (error) {
      console.error('댓글 등록 중 에러가 발생했습니다', error);
      setMessage('댓글 등록에 실패했습니다.'); // 실패 메시지 표시
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={commentText}
          onChange={handleInputChange}
          className="comment-input"
          placeholder="댓글을 입력해주세요..."
        />
        <button type="submit" className="comment-submit">댓글 등록</button>
      </form>
      {message && <div className="comment-message">{message}</div>} {/* 메시지 표시 */}
    </div>
  );
};

export default CommentWrite;
