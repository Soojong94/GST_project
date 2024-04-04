// MyCalendar.jsx

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar-02/sidebar';
import '../../src/App.css'; // 전역 스타일을 추가할 수도 있습니다.
// import Agenda from './../Agenda/Agenda';
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
  const [userInfo, setUserInfo] = useState(null);


// 캘린더 페이지 컴포넌트 내에서 세션 체크 및 리다이렉션

useEffect(() => {
  // 세션 체크 로직
  console.log("세션 체크 시작");
  if (!sessionStorage.getItem("user")) {
    console.log("세션이 없습니다. 메인 페이지로 리다이렉션합니다.");
    
  } else {
    console.log("세션이 있습니다.");
  }
}, []);


 useEffect(() => {
      const fetchData = async () => {
        try {
          const userinfo = JSON.parse(sessionStorage.getItem("user"))
          console.log('session', userinfo.user_id);
          if (userinfo) {
            const userId = userinfo.user_id;
            const dataSend = { user_id: userId };
            const response = await axios.post('http://localhost:5000/UserInfo', dataSend)
            setUserInfo(response.data[0]);
            console.log(response.data[0]);
          } else {
            console.log('사용자 정보가 없습니다.')
          }
        } catch (error) {
          console.error('회원정보 userid 전달 에러:', error);
        }
      };
  
      fetchData();
    }, []);
  

    const fetchScheduleData = async () => {
      try {
        const userinfo = JSON.parse(sessionStorage.getItem("user"));
        if (userinfo) {
          const userId = userinfo.user_id;
          const response = await axios.get(`/api/schedule/${userId}`);
          const scheduleData = response.data;
    
          const newEvents = [
            ...scheduleData.personal.map(event => ({ title: event.sche_content, start: event.st_dt, end: event.ed_dt, color: 'yellow', calendarType: 1, id: event.sche_idx, user_id: userId, clan_boss: userinfo.clan_boss, sche_idx: event.sche_idx })),
            ...scheduleData.clan.map(event => ({ title: event.sche_content, start: event.st_dt, end: event.ed_dt, color: 'lightgreen', calendarType: 2, id: event.sche_idx, user_id: userId, clan_boss: userinfo.clan_boss, sche_idx: event.sche_idx })),
            ...scheduleData.subscribedMatch.map(event => ({
              title: `${teamInfo[event.team_1]} ${event.team_1_score} vs ${event.team_2_score} ${teamInfo[event.team_2]}`, start: event.matched_at, color: '#FF6347', sche_idx: event.sche_idx
            }))
          ];
          setEvents(newEvents);
        } else {
          console.log('사용자 정보가 없습니다.');
        }
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };
    
    useEffect(() => {
      fetchScheduleData();
    }, []);

  const handleDateClick = (selectInfo) => {
    if (clickTimeout !== null) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
      navigate(`/AddSchedule/${selectInfo.startStr}`);
    } else {
      clickTimeout = setTimeout(() => {
        // fetchAgendaEvents(selectInfo.startStr);
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

  const deleteEvent = async (calendarType, sche_idx, user_id, clan_boss) => {
    try {
      await axios.post('http://localhost:5000/api/deleteSchedule', {
        calendarType,
        sche_idx,
        user_id,
        clan_boss
      });
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEventClick = (arg) => {
    if (arg.event.extendedProps.calendarType === 1 || arg.event.extendedProps.calendarType === 2) {
      if (window.confirm(`삭제 하시겠습니까? '${arg.event.title}'`)) {
        deleteEvent(arg.event.extendedProps.calendarType, arg.event.extendedProps.sche_idx, arg.event.extendedProps.user_id, arg.event.extendedProps.clan_boss);
        arg.event.remove();
      }
    } else {
      console.log("클랜 일정 또는 개인 일정이 아니므로 삭제되지 않습니다.");
    }
  };
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
