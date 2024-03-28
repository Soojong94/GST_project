import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddSchedule from '..AddSchedule/AddSchedule'; // AddSchedule 컴포넌트를 import 합니다.
import { useNavigate } from 'react-router-dom';

const MyCalendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2022-03-01' },
    { title: 'Event 2', date: '2022-03-02' }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi();
      calendar.render();
    }
  }, [calendarRef]);

  const handleSelect = (selectInfo) => {
    navigate(`/AddSchedule/${selectInfo.startStr}`);
  }

  const handleEventClick = (arg) => {
    if (window.confirm(`Are you sure you want to delete '${arg.event.title}'`)) {
      arg.event.remove();
    }
  }

  const handleAddSchedule = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <AddSchedule onAddSchedule={handleAddSchedule} /> {/* AddSchedule 컴포넌트를 렌더링합니다. */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        select={handleSelect}
        eventClick={handleEventClick}
        selectable={true}
      />
    </div>
  );
};

export default MyCalendar;
