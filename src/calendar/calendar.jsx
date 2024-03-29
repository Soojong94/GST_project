// MyCalendar.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';

const Calendar = ({ events }) => {
  const navigate = useNavigate();

  const handleSelect = (selectInfo) => {
    navigate(`/AddSchedule/${selectInfo.startStr}`);
  }

  const handleEventClick = (arg) => {
    if (window.confirm(`삭제 하시겠습니까용가리 '${arg.event.title}'`)) {
      arg.event.remove();
    }
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={events}
      select={handleSelect}
      eventClick={handleEventClick}
      selectable={true}
    />
  );
};

export default Calendar;
