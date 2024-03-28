import React from 'react';
import './App.css';
<<<<<<< HEAD
import Dashboard from './dashboard_logo';
import AppBar from './appbar';
import MyCalendar from './calendar';
=======
import Sidebar from '../src/sidebar-02/sidebar';
import Routing from './routing/Routing';
>>>>>>> 030d63968b5019078be43594d8351d023a50508b

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
