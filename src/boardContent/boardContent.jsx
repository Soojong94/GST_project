// Board_content.jsx

import React, { useEffect, useState } from 'react';
import './style.css';
import { Box, Typography, Grid } from '@mui/material';
import Sidebar from '../sidebar-02/sidebar'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../Comment/CommentWrite';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Board_content = () => {
  const { b_idx } = useParams();
  const [board, setBoard] = useState(null); // 게시글 상태
  const [comments, setComments] = useState([]); // 댓글 목록 상태
  const [error, setError] = useState(null); // 에러 상태

  const fetchComments = () => {
    axios.get(`/api/comment/${b_idx}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('에러가 발생했습니다!', error);
        setError(error);
      });
  };

  useEffect(() => {
    axios.get(`/api/board/${b_idx}`)
      .then(response => {
        setBoard(response.data[0]); // 서버 응답이 배열인 경우 첫 번째 요소를 사용
      })
      .catch(error => {
        console.error('에러가 발생했습니다!', error);
        setError(error);
      });

    fetchComments();
  }, [b_idx]);

  const handleCommentSubmit = (newComment) => {
    const currentUserNick = '사용자 닉네임';
    // 새 댓글을 서버에 제출 (axios.post 등 사용)

    // 새 댓글이 성공적으로 데이터베이스에 추가된 경우,
    // 댓글 상태를 업데이트하여 새 댓글을 반영
    setComments(prevComments => [...prevComments, newComment]);
  };

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (!board) return null;  // 데이터가 아직 없을 때는 null을 반환
  // board 데이터를 이용해 렌더링
  return (
    <div>
      <Sidebar />
      <div className="board_content">
        <div id='present_content'>
          <article className="board_content_card">
            <div className="board_content_background" id='present_content_img'>
              <img src={board.b_file} alt="Image" />
            </div>
          </article>
          <div className="board_content_content">
            <div className="board_content_card-content ">
              <h2>{board.b_title}</h2>
              <p>{board.b_content}</p>
            </div>
            <div className="board_content_blog-preview__bottom">
              <div className="board_content_blog-author">
                <div className="board_content_blog-author__name">{board.user_nick}</div>
              </div>
            </div>
          </div>

        </div>
        <Button variant="contained" id="clan_apply" >
          클랜 가입 신청
        </Button>
        <hr></hr>

        <div className='board_comment'>

          <Box mt={4}>
            <CommentForm onCommentSubmit={handleCommentSubmit} />
          </Box>
          <Grid container spacing={2}>
            {comments.map((comment, index) => (
              <Grid item key={index} xs={12}>
                <Box p={2} bgcolor="#f5f5f5" borderRadius={4}>
                  <Typography variant="body1">{comment.user_nick}: {comment.cmt_content}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Board_content;
