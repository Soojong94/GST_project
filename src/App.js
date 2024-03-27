import React from 'react';
import './App.css';
import Sidebar from '../src/sidebar-02/sidebar';
import Routing from './routing/Routing';

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
