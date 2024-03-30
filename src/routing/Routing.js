import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamSubscriptions from '../team_subsc/team_logo';
import ClanBoard from '../board/board';
import TeamInfo from '../team_info/team_info';
import AddSchedule from '../AddSchedule/AddSchedule';
import Calendar from '../calendar/calendar';
<<<<<<< HEAD
import Mypage from './../Mypage/Mypage';
=======
import Mypage from '../Mypage/Mypage';
import Mainpage from '../mainpage/startbootstrap-grayscale-gh-pages/mainpage'
import Board_1 from '../boardContent/boardContent';
>>>>>>> 002167940934ea62201480b70274b76bb97dde66

function Routing({ handleNewSchedule, events }) {
  return (
    <Routes>

      <Route path="/" element={<Mainpage />} />
      <Route path="/Mainpage" element={<Mainpage />} />
      <Route path='/Calendar' element={<Calendar events={events} />} />
      <Route path="/TeamSubscriptions" element={<TeamSubscriptions />} />
      <Route path="/ClanBoard" element={<ClanBoard />} />
      <Route path="/TeamInfo" element={<TeamInfo />} />
      <Route path="/AddSchedule/:date" element={<AddSchedule onScheduleAdded={handleNewSchedule} />} />
      <Route path="/Mypage" element={<Mypage />} />
      <Route path="/Board_1" element={<Board_1 />} />
>>>>>>> 002167940934ea62201480b70274b76bb97dde66

    </Routes>
  );
}

export default Routing;
