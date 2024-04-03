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
  const [userId, setUserId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editing, setIsEditing] = useState(false);
  const [clan, setClanName] = useState('');
  const [isJoinedClan, setIsJoinedClan] = useState(false);


  const fetchSessionData = async () => {
    try {
      const response = await axios.get('/session');
      const sessionData = response.data;
      console.log(sessionData);
      const { user_id, clan } = sessionData;
      setUserId(user_id);
      setClanName(clan); // 클랜 이름 설정
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };



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

  useEffect(() => {
    fetchSessionData();
  }, []); // board 상태 변경 시 fetchSessionData 함수 호출

  const handleDeleteClick = () => {
    axios.delete(`/api/boardDelete/${b_idx}/${userId}`)
      .then(response => {
        window.location.href = '/ClanBoard';
      })
      .catch(error => {
        console.error('게시글 삭제 에러:', error);
        setError(error);
      });
  };


  const handleSaveClick = () => {
    axios.put(`/api/boardUpdate/${b_idx}`, {
      user_id: userId,
      title: editTitle,
      content: editContent
    })
      .then(response => {
        setIsEditing(false);
        window.location.reload();
        // 필요한 작업 수행
      })
      .catch(error => {
        console.error('게시글 수정 에러:', error);
        setError(error);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditTitle(board.b_title);
    setEditContent(board.b_content);
  };

  const handleJoinClanClick = async () => {
    try {
      if (clan === null) {
        const response = await axios.post('/api/joinClan', { user_id: userId, clan: board.b_title });
        if (response.status === 200) {
          alert('클랜에 가입되셨습니다!');
          setIsJoinedClan(true); // 클랜 가입 여부 상태 업데이트
        } else {
          alert('클랜 인원이 가득찼습니다.');
        }
      } else if (clan !== board.b_title) {
        const response = await axios.post('/api/joinClan', { user_id: userId, clan: board.b_title });
        if (response.status === 200) {
          setClanName(board.b_title); // 클랜이 변경되었으므로 상태를 업데이트
          setIsJoinedClan(true); // 클랜 가입 여부 상태 업데이트
          alert('클랜이 변경되었습니다.');
        } else {
          alert('클랜 인원이 가득찼습니다.');
        }
      } else {
        // 버튼 텍스트가 "My Clan"일 때 아무 동작도 수행하지 않음
      }
    } catch (error) {
      console.error('클랜 가입 여부 확인 중 에러:', error);
    }
  };


  useEffect(() => {
    if (clan !== null && board !== null) {
      setIsJoinedClan(clan === board.b_title);
    }
  }, [clan]); // clan 상태가 변경될 때만 실행

  const clanButtonText = isJoinedClan ? 'My Clan' : '클랜 가입 신청';


  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (!board) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <Sidebar />
      <div className="board_content">
        <div id="present_content">
          <article className="board_content_card">
            <div className="board_content_background" id="present_content_img">
              <img src={board.b_file} alt="Image" />
            </div>
          </article>
          <div className="board_content_content">
            {editing ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                />
                <button onClick={handleSaveClick}>저장</button>
              </div>
            ) : (
              <div className="board_content_card-content">
                <h2>{board.b_title}</h2>
                <p>{board.b_content}</p>
              </div>
            )}
            <div className="board_content_blog-preview__bottom">
              <div className="board_content_blog-author">
                <div className="board_content_blog-author__name">{board.user_nick}</div>
              </div>
            </div>
          </div>
        </div>

        <Button variant="contained" id="board_delete" onClick={handleDeleteClick} style={{ display: userId === board.user_id ? 'block' : 'none' }}>
          게시글 삭제
        </Button>
        <br />
        <br />
        <Button variant="contained" id="board_modify" onClick={handleEditClick} style={{ display: userId === board.user_id ? 'block' : 'none' }}>
          게시글 수정
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          id="clan_apply"
          onClick={handleJoinClanClick}
        >
          {clanButtonText}
        </Button>

        <hr />

        <div className="board_comment">
          <Box mt={4}>
            <CommentForm />
          </Box>
          <Grid container spacing={2}>
            {comments.map((comment, index) => (
              <Grid item key={index} xs={12}>
                <Box p={2} bgcolor="#f5f5f5" borderRadius={4}>
                  <Typography variant="body1">
                    {comment.user_nick}: {comment.cmt_content}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <hr />
    </div>
  );
};


export default Board_content;
