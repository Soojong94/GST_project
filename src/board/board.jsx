import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'
import Sidebar from '../sidebar-02/sidebar';
import '../../src/App.css'
import {Link} from 'react-router-dom'


function BoardCard({ imgSrc, title, content, b_idx }) {
  return (
    <div className='main_container'>
      <Sidebar />
      <Link to={`/Board/${b_idx}`} className="clan_board_card">
    <article>
      <figure>
        <img src={imgSrc} alt="view"/>
      </figure>
      <div className="article-preview" id={b_idx}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </article>
    </Link>
    </div>
  );
}

function Board() {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    axios.get('/api/boardList')
      .then(response => {
        setBoards(response.data);

      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <>
      <div className='clanCreate-btn'>
        <Link to={'/ClanCreate'}>
          <button>클랜 등록</button>
        </Link>
      </div>
      <div className="articles">
      {boards.map((board, index) => (
        <BoardCard
          key={index}
          b_idx = {board.b_idx}
          imgSrc={board.b_file}
          title={board.b_title}
          content={board.b_content}
        />
      ))}
      </div>
    </>
  );
}

export default Board;
