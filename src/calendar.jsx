import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MyCalendar = () => {
  const calendarRef = useRef(null); // useRef 훅을 사용하여 FullCalendar 컴포넌트의 참조를 저장합니다.

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi(); // FullCalendar API에 접근하기 위해 getApi 메서드를 사용합니다.
      calendar.render(); // FullCalendar를 렌더링합니다.
    }
  }, [calendarRef]);

  return (
    <FullCalendar
      ref={calendarRef} // FullCalendar 컴포넌트에 ref 속성을 추가하여 참조를 저장합니다.
      plugins={[dayGridPlugin]} // 필요한 플러그인을 추가합니다.
      initialView='dayGridMonth' // 초기 뷰를 설정합니다.
    />
  );
};

export default MyCalendar;
