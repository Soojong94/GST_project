import React from 'react';
import './App.css';
import Dashboard from './dashboard_logo';
import AppBar from './appbar';
import MyCalendar from './calendar';

function App() {
  return (
    <div className="container">
      <div id='sidebar'>
        <Sidebar />
      </div>
      <div className='calendar'>
        <Routing />
      </div>
    </div>
  );
}

export default App;
