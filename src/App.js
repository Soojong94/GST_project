import React from 'react';
import './App.css';
import Dashboard from './dashboard_logo';
import AppBar from './appbar';
import MyCalendar from './calendar';

function App() {
  return (
    <div className="main_container">
      <div className='main_calendar'>
        <Calendar2 />
        <Routing />

      </div>
    </div>
  );
}

export default App;
