import React, { useState, useEffect } from 'react';
import './style.css'; // 스타일 시트를 가져옵니다.

function Calendar() {
  const [activeDay, setActiveDay] = useState();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [eventsArr, setEventsArr] = useState([]);

  useEffect(() => {
    initCalendar();
    getEvents();
  }, [month, year]);

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // Set the date displayed in the calendar header
    const dateHeader = `${months[month]} ${year}`;

    let days = "";

    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      // Check if event is present on that day
      const event = eventsArr.find(eventObj =>
        eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year
      );
      if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
        setActiveDay(i);
        updateEvents(i);
        if (event) {
          days += `<div class="day today active event">${i}</div>`;
        } else {
          days += `<div class="day today active">${i}</div>`;
        }
      } else {
        if (event) {
          days += `<div class="day event">${i}</div>`;
        } else {
          days += `<div class="day ">${i}</div>`;
        }
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }

    // Set the HTML content for the days container
    document.querySelector(".days").innerHTML = days;
    addListner();
  };

  const prevMonth = () => {
    setMonth(prevMonth => {
      let newMonth = prevMonth - 1;
      if (newMonth < 0) {
        newMonth = 11;
        setYear(prevYear => prevYear - 1);
      }
      return newMonth;
    });
  };

  const nextMonth = () => {
    setMonth(prevMonth => {
      let newMonth = prevMonth + 1;
      if (newMonth > 11) {
        newMonth = 0;
        setYear(prevYear => prevYear + 1);
      }
      return newMonth;
    });
  };
  

  const getEvents = () => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEventsArr(JSON.parse(storedEvents));
    }
  };

  const addListner = () => {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        setActiveDay(Number(e.target.innerHTML));
        updateEvents(Number(e.target.innerHTML));
      });
    });
  };

  const updateEvents = (date) => {
    // Function to update the events displayed based on the selected date
    // Similar to the original JavaScript code
  };

  return (
    <div className="container">
      <div className="left">
        <div className="calendar">
          <div className="month">
            <i className="fas fa-angle-left prev" onClick={prevMonth}></i>
            <div className="date">{`${months[month]} ${year}`}</div>
            <i className="fas fa-angle-right next" onClick={nextMonth}></i>
          </div>
          <div className="weekdays">
            {daysOfWeek.map(day => <div key={day}>{day}</div>)}
          </div>
          <div className="days"></div>
          <input type="date" id="datepicker" />
          <input type="button" value="Go" onClick={initCalendar} />
        </div>
      </div>
      <div className="right">
        <div className="events">
          <h2>Events on {activeDay && `${activeDay} ${months[month]} ${year}`}</h2>
          <ul id="events">
            {/* Event list will be displayed here */}
          </ul>
          <input type="text" id="event" placeholder="Enter event details" />
          <input type="button" value="Add Event" onClick={updateEvents} />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
