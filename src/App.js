// App.js
import React from 'react';
import './App.css';
import Routing from './routing/Routing';
import useCalendarEvent from './calendar/calendarEvent';
import BoardWrite from './boardwrite/boardwrite';
import CommentWrite from './Comment/CommentWrite';
function App() {
  const { events, handleNewSchedule } = useCalendarEvent(); 

  return (
    <div>
      <Routing events={events} handleNewSchedule={handleNewSchedule}/>
    <BoardWrite></BoardWrite>
    <CommentWrite></CommentWrite>

    </div>
  );
}

export default App;
