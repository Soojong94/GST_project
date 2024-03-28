import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from '../calendar/calendar'; 
import TeamSubscriptions from '../team_subsc/team_logo'; 
import ClanBoard from '../board/board'; 
import TeamInfo from '../team_info/team_info'; 
import Calendar2 from '../calendar2/calendar2';


function Routing() {
  return (
    <Routes>
      {/* <Route path = "/" element={<Calendar2 />}></Route>
      <Route path = "Calendar2" element={<Calendar2 />}></Route> */}
      {/* <Route path="/" element={<Calendar />} />
      <Route path="/Calendar" element={<Calendar />} /> */}
      <Route path="/TeamSubscriptions" element={<TeamSubscriptions />} />
      <Route path="/ClanBoard" element={<ClanBoard />} />
      <Route path="/TeamInfo" element={<TeamInfo />} />
    </Routes>
  );
}

export default Routing;
