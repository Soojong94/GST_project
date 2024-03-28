import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamSubscriptions from '../team_subsc/team_logo';
import ClanBoard from '../board/board';
import TeamInfo from '../team_info/team_info';
import AddSchedule from '../AddSchedule/AddSchedule';
import Calendar from '../calendar/calendar';

function Routing({handleNewSchedule, events}) {
  return (
    <Routes>
      
      <Route path='/' element={<Calendar />} />
      <Route path='/Calendar' element={<Calendar events={events} />} />
      <Route path="/TeamSubscriptions" element={<TeamSubscriptions />} />
      <Route path="/ClanBoard" element={<ClanBoard />} />
      <Route path="/TeamInfo" element={<TeamInfo />} />
      <Route path="/AddSchedule/:date" element={<AddSchedule onScheduleAdded={handleNewSchedule} />} />


    </Routes>
  );
}

export default Routing;
