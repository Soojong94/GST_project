import React from 'react';
import './App.css';
<<<<<<< HEAD
import Routing from './routing/Routing';
import Calendar2 from  './calendar2/calendar2'
=======
<<<<<<< HEAD
import Dashboard from './dashboard_logo';
import AppBar from './appbar';
import MyCalendar from './calendar';
=======
import Sidebar from '../src/sidebar-02/sidebar';
import Routing from './routing/Routing';
>>>>>>> 030d63968b5019078be43594d8351d023a50508b
>>>>>>> 3c2afc836e4b83e5b8a4170d5c20ca501545944b

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
