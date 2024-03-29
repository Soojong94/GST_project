// App.js
import React from 'react';
import './App.css';
import Routing from './routing/Routing';
import useCalendarEvent from './calendar/calendarEvent';

function App() {
  const { events, handleNewSchedule } = useCalendarEvent(); 

  return (
    <div>
      <Routing events={events} handleNewSchedule={handleNewSchedule}/>
    </div>
  );
}

export default App;
