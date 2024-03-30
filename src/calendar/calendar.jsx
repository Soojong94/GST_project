// MyCalendar.jsx
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar-02/sidebar';
import '../../src/App.css'
import Agenda from './../Agenda/Agenda';

const Calendar = ({ events }) => {
  const navigate = useNavigate();

  let clickTimeout = null;

  const [isAgendaVisible, setAgendaVisible] = useState(false);

  const handleDateClick = (selectInfo) => {
    if (clickTimeout !== null) {
      // 더블 클릭 발생
      clearTimeout(clickTimeout);
      clickTimeout = null;
      navigate(`/AddSchedule/${selectInfo.startStr}`);
    } else {
      // 첫 클릭 발생
      clickTimeout = setTimeout(() => {
        setAgendaVisible(true);
        clickTimeout = null;
      }, 250); // 250ms 안에 또 클릭이 발생하면 더블 클릭으로 처리
    }
  }

  const handleAgendaClose = () => {
    setAgendaVisible(false);
  }

  // 원래 있던 navigate
  // const handleSelect = (selectInfo) => {
  //   navigate(`/AddSchedule/${selectInfo.startStr}`);
  // }

  const handleEventClick = (arg) => {
    if (window.confirm(`삭제 하시겠습니까용가리 '${arg.event.title}'`)) {
      arg.event.remove();
    }
  }

  return (
    <div className='main_container'>
      <Sidebar />
      <div className = 'main_calendar'>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          events={events}
          select={handleDateClick}
          eventClick={handleEventClick}
          selectable={true}
        />
      </div>
      {isAgendaVisible &&(
        <div className='calendar_agenda'>
          <Agenda onclose={handleAgendaClose}/></div>

      )}
    </div>
  );
};

export default Calendar;
