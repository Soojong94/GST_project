import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

const MyCalendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2022-03-01' },
    { title: 'Event 2', date: '2022-03-02' }
  ]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi(); 
      calendar.render();
    }
  }, [calendarRef]);

  const handleDateClick = (arg) => { // bind with an arrow function
    const title = prompt('Enter Event Title');
    if (title) {
      setEvents([...events, { title, date: arg.date }]);
    }
  }

  const handleEventClick = (arg) => {
    if (window.confirm(`Are you sure you want to delete '${arg.event.title}'`)) {
      arg.event.remove();
    }
  }

  return (
    <FullCalendar
      ref={calendarRef} 
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={events}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      selectable={true}
    />
  );
};

export default MyCalendar;