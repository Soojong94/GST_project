// BoardContent.jsx
import React from 'react';
import './style.css';
import previewImage from './assets/preview.png';
import Reply from './reply'; // Reply 컴포넌트 import

const BoardContent = () => {
  return (
    <div className="board_content">
      {/* 이전글*/}
      <div id='present_content'>
        <article className="board_content_card">
          <div className="board_content_background" id='present_content_img'>
            <img src={previewImage} alt="Fetch API GraphQL Preview" />
          </div>
        </article>
        <div className="board_content_content">
          <div className="board_content_card-content">
            <h2>현재 글 제목입니다</h2>
            <p>
              {/* 글 내용 */}
            </p>
          </div>
          <div className="board_content_blog-preview__bottom">
            <div className="board_content_blog-author">
              <div className="board_content_blog-author__name">
                저는 유저 닉네임입니다
              </div>
            </div>
          </div>
        </div>

        {/* 댓글 컴포넌트 사용 */}
        <Reply />
      </div>
    </div>
  );
};

export default BoardContent;
