// calendarEvent.js
import React, { useState } from 'react';

const useCalendarEvent = () => {
  const [events, setEvents] = useState([
    { title: 'Event 1', start: '2022-03-01' },
    { title: 'Event 2', start: '2022-03-02' }
  ]);

  const handleNewSchedule = (newEvent) => {
    console.log('handle New Schedule Func', events);
    const { calendarType, st_dt, ed_dt, st_tm ,ed_tm, sche_content} = newEvent;
    const start = `${st_dt}T${st_tm || '00:00'}`;
    const end = ed_dt ? `${ed_dt}T${ed_tm || '00:00'}` : null;

    const event = {
      calendarType,
      start,
      end, 
      st_tm, 
      ed_tm,
      sche_content
    };

    setEvents([...events, event]);
  };

  return { events, handleNewSchedule };
};

export default useCalendarEvent;
