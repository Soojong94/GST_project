// MyCalendar.jsx

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar-02/sidebar';
import '../../src/App.css'; // 전역 스타일을 추가할 수도 있습니다.
import Agenda from './../Agenda/Agenda';
import axios from 'axios';

const teamInfo = {
  1: 'T1',
  2: 'GenG',
  3: 'DK',
  4: 'HLE',
  5: 'KT',
  6: 'DRX',
  7: 'NS',
  8: 'KDF',
  9: 'Fearx',
  10: 'BRO'
};

const Calendar = ({ initialEvents }) => {
  const navigate = useNavigate();

  let clickTimeout = null;

  const [isAgendaVisible, setAgendaVisible] = useState(false);
  const [agendaEvents, setAgendaEvents] = useState([]);
  const [events, setEvents] = useState(initialEvents);

  const fetchSessionData = async () => {
    try {
      const response = await axios.get('/session');
      const sessionData = response.data;

      fetchScheduleData(sessionData.user_id);
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

  const fetchScheduleData = async (userId) => {
    try {
      const response = await axios.get(`/api/schedule/${userId}`);
      const scheduleData = response.data;

      const newEvents = [
        ...scheduleData.personal.map(event => ({ title: event.sche_content, start: event.st_dt, end: event.ed_dt, color: 'yellow'})),
        ...scheduleData.clan.map(event => ({ title: event.sche_content, start: event.st_dt, end: event.ed_dt, color: 'lightgreen' })),
        ...scheduleData.subscribedMatch.map(event => ({
          title: `${teamInfo[event.team_1]} ${event.team_1_score} vs ${event.team_2_score}
         ${teamInfo[event.team_2]}`, start: event.matched_at, color: '#FF6347'
        }))
      ];
      setEvents(newEvents);

    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  const handleDateClick = (selectInfo) => {
    if (clickTimeout !== null) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
      navigate(`/AddSchedule/${selectInfo.startStr}`);
    } else {
      clickTimeout = setTimeout(() => {
        fetchAgendaEvents(selectInfo.startStr);
        setAgendaVisible(true);
        clickTimeout = null;
      }, 250);
    }
  }

  const fetchAgendaEvents = async (date) => {
    try {
      const response = await axios.get(`/api/agenda/${date}`);
      const agendaEventsData = response.data;
      setAgendaEvents(agendaEventsData);
    } catch (error) {
      console.error('Error fetching agenda events:', error);
    }
  };

  const handleAgendaClose = () => {
    setAgendaVisible(false);
  }

  const handleEventClick = (arg) => {
    if (window.confirm(`삭제 하시겠습니까? '${arg.event.title}'`)) {
      arg.event.remove();
    }
  }

  return (
    <div className='main_container'>
      <Sidebar />
      <div className='main_calendar'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          events={events}
          select={handleDateClick}
          eventClick={handleEventClick}
          selectable={true}
          themeSystem="standard"
        />
      </div>

    </div>
  );
};

export default Calendar;
