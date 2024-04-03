import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const CommentForm = () => {
  const { postId } = useParams();
  const [commentText, setCommentText] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [b_idx, setBIdx] = useState(null);

  useEffect(() => {
    const getUserIdFromSessionStorage = () => {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.user_id);
      } else {
        console.error('User ID not found in session storage');
      }
    };

    getUserIdFromSessionStorage();

    const url = window.location.href;
    const match = url.match(/\/(\d+)(\/)?$/);
    if (match) {
      const lastNumber = match[1];
      setBIdx(lastNumber);
    }
  }, []);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setMessage('댓글 내용을 입력해주세요.');
      return;
    }

    if (!b_idx) {
      setMessage('댓글을 등록할 게시물을 찾을 수 없습니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/commentInsert', {
        b_idx: b_idx,
        user_id: userId,
        cmt_content: commentText,
      });

      setMessage(response.data);
      setCommentText('');

      window.location.reload();
    } catch (error) {
      console.error('댓글 등록 중 에러가 발생했습니다', error);
      setMessage(error.response ? error.response.data : '댓글 등록에 실패했습니다.');
    }
  };

  return (
    <div className="board_comment">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          댓글
        </Typography>
        <form id="comment_form" onSubmit={handleSubmit}>
          <TextField
            label="댓글을 입력하세요"
            variant="outlined"
            value={commentText}
            onChange={handleCommentChange}
            multiline
            rows={4}
            sx={{ width: '30%' }}
            inputProps={{ maxLength: 100 }}
            margin="normal"
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            댓글 작성
          </Button>
        </form>
        {message && <Typography>{message}</Typography>}
      </Box>
    </div>
  );
};

export default CommentForm;
