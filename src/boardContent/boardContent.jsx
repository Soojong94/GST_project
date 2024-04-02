import React, { useEffect, useState } from 'react';
import './style.css';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import preview from './assets/preview.png';
import Sidebar from '../sidebar-02/sidebar'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../Comment/CommentWrite';

const Board_content = () => {
  const { b_idx } = useParams();
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);

  const fetchComments = () => {
    axios.get(`http://localhost:5000/api/comment/${b_idx}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError(error);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/board/${b_idx}`)
      .then(response => {
        setBoard(response.data[0]); // 서버 응답이 배열인 경우 첫 번째 요소를 사용
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError(error);
      });

    fetchComments();
  }, [b_idx]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const currentUserNick = '사용자 닉네임';
      axios.post(`http://localhost:5000/api/comment`, {
        b_idx,
        user_nick: currentUserNick,
        comment: newComment
      })
        .then(() => {
          fetchComments();
        })
        .catch(error => {
          console.error('There was an error!', error);
          setError(error);
        });
      setNewComment('');
    }
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
              <img src={preview} alt="Fetch API GraphQL Preview" />
            </div>
          </article>
          <div className="board_content_content">
            <div className="board_content_card-content ">
              <h2>{board.b_title}</h2>
              <p>{board.b_content}</p>
            </div>
            <div className="board_content_blog-preview__bottom">
              <div className="board_content_blog-author">
                <div className="board_content_blog-author__name">
                  <div className="board_content_blog-author__name">{board.user_nick}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='board_comment'>
          <Box mt={4}>
            <CommentForm />
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
      </div >
    </div>
  );
};

export default Board_content;