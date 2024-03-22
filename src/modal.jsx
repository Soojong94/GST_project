import React, { useState } from 'react';
import './modal.css';





function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div id='mdbtn'>
      <div onClick={toggleModal} style={{ width: '100px', height: '100px', background: 'red' }}>Open Modal Area 1</div>
      <div onClick={toggleModal} style={{ width: '100px', height: '100px', background: 'green' }}>Open Modal Area 2</div>

      {isOpen && (
        <div className='modal' onClick={toggleModal}>
          <div className='modal-content'>
            <h2>Hello, this is a modal</h2>
            <p>This is the modal content.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;