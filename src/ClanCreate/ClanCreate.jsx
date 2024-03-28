import React from 'react';
import './ClanCreate.css'
import Modal from '../모달창/Modal';


function ClanCreate() {

  

    return (
        <>
          <div>
            <button className='clanCreate-Btn'>
              <div>
              <Modal triggerText="클랜 등록">
                <div className='clanCreate-content'>
                  <div id='clanCreateNames'>
                    <h2 className='clanCreateTitle'>클랜 이름</h2>
                    <div className='clanCreate-inputs'>
                      <input id='clanName-input'></input>
                    </div>
                  </div>
                  <div id='clanCreateText'>
                    <h2 className='clanCreateTitle'>클랜 소개글</h2>
                    <div className='clanCreate-inputs'>
                      <textarea id='clanText'></textarea>
                    </div>
                  </div>
                  <div id='clanCreateFiles'>
                    <h3 className='clanCreateTitle'>사진 첨부</h3>
                    <input type='file' ></input>
                  </div>
                  <div>
                    <h3>인원 제한</h3>
                    <select id='clanMembers'>
                      <option value="10">10명</option>
                      <option value="20">20명</option>
                      <option value="30">30명</option>
                      <option value="40">40명</option>
                      <option value="50">50명</option>
                    </select>
                  </div>
                  <div id='clanCreateButtons'>
                    <button id='clanCreateSub-Btn'>등록</button>
                  </div>
                </div>
              </Modal>
              </div>
            </button>
          </div>
        </>
    );
}

export default ClanCreate;