import React, { useState } from "react";
import "./Agenda.css";

function Agenda() {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setAnimation(isOpen ? "closing" : "opening");
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const Modal = () => (
    <div className={`agenda-modal ${animation}`} onClick={toggleModal}>
      <div className="agenda-modal-content" onClick={stopPropagation}>
        <div className="button-group">
          <button type="submit" className="edit-btn">
            수정
          </button>
          <button type="button" className="delete-btn">
            삭제
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="agenda-container">
      <div className="agenda">
        <div className="agenda-group">
          <div className="agenda-item" onClick={toggleModal}>
            {isOpen && <Modal />}
            <h3 className="agenda-title">
              <strong>개인 일정</strong>
            </h3>
            <p className="agenda-description">9:30 ~ 11:30</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agenda;