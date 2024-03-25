// App.js
import React from 'react';
import './App.css';
import Sidebar from '../src/sidebar-02/sidebar'
import Calendar from './calendar';
import TeamSubsc from './team_subsc/team_logo';



function App() {
  return (
    <div className="container">
      <div id="sidebar" >

        <Sidebar />

      </div>
      {/* <div className='calendar'>
        <Calendar />

      </div> */}
      <div id = "team_subsc">
        <TeamSubsc />
      </div>
    </div>

  );
}
// function TeamSubsc(props){
//   return(
//     <>
//     <div id='sidebar'>
//       <Sidebar />
//     </div>
//     <div>
//       <TeamSubsc />
//     </div>
//     </>
//   )
// }


export default App;
