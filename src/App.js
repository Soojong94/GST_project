import React from 'react';
import './App.css';
import Routing from './routing/Routing';
import BoardWrite from './boardwrite/boardwrite';

function App() {
  return (
    <div className="main_container">
      <div className='main_calendar'>

        <BoardWrite />

        <Routing />

      </div>
    </div>
  );
}

export default App;
