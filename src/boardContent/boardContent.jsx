// BlogPreviewCard.jsx

import React, { useState } from 'react';
import './style.css';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import preview from './assets/preview.png';


const Board_content = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {

      const currentUserNick = '사용자 닉네임';

      const commentWithNick = `${currentUserNick}: ${newComment}`;
      setComments([...comments, commentWithNick]);
      setNewComment('');
    }
  };
  return (
    <div className="board_content">
      <div id='previous_content'>
        <article className="board_content_card">
          <div className="board_content_background">
            <img src={preview} alt="Fetch API GraphQL Preview" />
          </div>
        </article>
        <div className="board_content_content">
          <div className="board_content_card-content">
            <h2>이전 글 제목입니다</h2>

          </div>
          <div className="board_content_blog-preview__bottom">
            <div className="board_content_blog-author">

              <div className="board_content_blog-author__name">
                <div className="board_content_blog-author__name">저는 유저 닉네임입니다
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div id='present_content'>
        <article className="board_content_card">
          <div className="board_content_background" id='present_content_img'>
            <img src={preview} alt="Fetch API GraphQL Preview" />
          </div>
        </article>
        <div className="board_content_content">
          <div className="board_content_card-content ">
            <h2>현재 글 제목입니다</h2>
            <p>
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
              현재 글 내용입니다
            </p>
          </div>
          <div className="board_content_blog-preview__bottom">
            <div className="board_content_blog-author">

              <div className="board_content_blog-author__name">
                <div className="board_content_blog-author__name">저는 유저 닉네임입니다
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='board_comment'>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>댓글</Typography>
          <form id='comment_form' onSubmit={handleSubmit}>
            <TextField
              label="댓글을 입력하세요"
              variant="outlined"
              value={newComment}
              onChange={handleCommentChange}
              multiline
              rows={4}
              sx={{ width: '30%' }} // 너비를 100%로 설정
              inputProps={{ maxLength: 100 }} // 최대 입력 가능한 문자 수
              margin="normal"
            />
            <br></br>
            <Button type="submit" variant="contained" color="primary">댓글 작성</Button>
            <Grid container spacing={2}>
              {comments.map((comment, index) => (
                <Grid item key={index} xs={12}>
                  <Box p={2} bgcolor="#f5f5f5" borderRadius={4}>
                    <Typography variant="body1">{comment}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

          </form>
        </Box>
      </div>

      <div id='next_content'>
        <article className="board_content_card">
          <div className="board_content_background">
            <img src={preview} alt="Fetch API GraphQL Preview" />
          </div>
        </article>
        <div className="board_content_content">
          <div className="board_content_card-content">
            <h2>다음 글 제목입니다</h2>

          </div>
          <div className="board_content_blog-preview__bottom">
            <div className="board_content_blog-author">

              <div className="board_content_blog-author__name">
                <div className="board_content_blog-author__name">저는 유저 닉네임입니다
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >


  );
};

export default Board_content;
