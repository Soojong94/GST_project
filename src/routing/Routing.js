import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamSubscriptions from '../team_subsc/team_logo';
import ClanBoard from '../board/board';
import TeamInfo from '../team_info/team_info';
import AddSchedule from '../AddSchedule/AddSchedule';
import Calendar from '../calendar/calendar';

import Mypage from '../Mypage/Mypage';
import Mainpage from '../mainpage/startbootstrap-grayscale-gh-pages/mainpage'
import Board_1 from '../boardContent/boardContent';
import Signup from '../signup_page/signup';
import Signin from '../signin_page/login';


function Routing({ handleNewSchedule, events }) {
  return (
    <Routes>

      <Route path="/" element={<Mainpage />} />
      <Route path="/Mainpage" element={<Mainpage />} />
      <Route path='/Calendar' element={<Calendar events={events} />} />
      <Route path="/TeamSubscriptions" element={<TeamSubscriptions />} />
      <Route path="/ClanBoard" element={<ClanBoard />} />
      <Route path="/TeamInfo/:team_idx" element={<TeamInfo />} />
      <Route path="/AddSchedule/:date" element={<AddSchedule onScheduleAdded={handleNewSchedule} />} />
      <Route path="/Mypage" element={<Mypage />} />
      <Route path="/Board/:b_idx" element={<Board_1 />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Signup" element={<Signup />} />



    </Routes>
  );
}

export default Routing;
