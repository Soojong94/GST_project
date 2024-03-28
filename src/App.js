import React from 'react';
import './App.css';
import Routing from './routing/Routing';
import Calendar2 from  './calendar2/calendar2'

function App() {
  return (
    <div className="main_container">
      <div className='main_calendar'>
      
        <Routing />

      </div>
    </div>
  );
}

export default App;
