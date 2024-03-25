// App.js

import React from 'react';
import './App.css';
import Dashboard from './dashboard_logo';
import MyCalendar from './calendar';
import Sidebar from '../src/sidebar-02/sidebar_01';


function App() {
  return (
    <div className="container">
      <div id="sidebar" >
        <Dashboard />
        <Sidebar />
      </div>
      <div id="myCalendar">
        <MyCalendar />

      </div>
    </div>
  );
}


export default App;
