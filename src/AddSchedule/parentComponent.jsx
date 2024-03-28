import React, { useState } from 'react';
import AddSchedule from './AddSchedule';
import MyCalendar from './MyCalendar';

const ParentComponent = () => {
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2022-03-01' },
    { title: 'Event 2', date: '2022-03-02' }
  ]);

  const handleAddSchedule = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <AddSchedule onAddSchedule={handleAddSchedule} />
      <MyCalendar events={events} />
    </div>
  );
};

export default ParentComponent;
