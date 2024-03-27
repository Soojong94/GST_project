// BlogPreviewCard.jsx

import React from 'react';
import './style.css';
import preview from './assets/preview.png'

const Board_content = () => {
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

      {/* ------------------------------------------------------------------------*/}


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







        {/* ------------------------------------------------------------------------ */}

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
