import React, { useState } from 'react';
import './AddSchedule.css'; 
import { useParams, useNavigate } from 'react-router-dom'; 

const AddSchedule = ({ onScheduleAdded,testData }) => {
  console.log('add schedule')
  const { date } = useParams(); 
  const navigate = useNavigate(); 


  const [formData, setFormData] = useState({
    calendarType: '1', 
    title: '',
    startDate: '',
    endDate: '',
    time: '',
    location: '',
    description: '',
    
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleCancel = () => {
    navigate('/calendar');
  };


  const handleReset = () => {
    setFormData({
      calendarType: '1',
      title: '',
      startDate: '',
      endDate: '',
      time: '',
      location: '',
      description: '',
      
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('일정 데이터:', formData);
    
    navigate('/calendar'); 
    
    onScheduleAdded({ ...formData, calendarType: parseInt(formData.calendarType) });
    
  };

  return (
    <div className="form-container">
      <div className="form p-4 md:p-8 mx-auto md:max-w-md">
        <div className="header mb-4 md:mb-6">
          <h2 className="text-2xl font-bold">일정 등록</h2>
        </div>
        <form id="schedule-form" onSubmit={handleSubmit}>
        <div className="input-group mb-4">
            <label htmlFor="calendar-type" className="label">캘린더 종류</label>
            <select id="calendar-type" name="calendarType" className="input" value={formData.calendarType} onChange={handleChange}>
              <option value="1">개인 일정</option>
              <option value="2">팀 일정</option>
              <option value="3">클랜 일정</option>
            </select>
          </div>
          <input type="hidden" name="date" value={date} /> {/* 라우터에서 받은 날짜 정보를 숨겨진 필드로 전달 */}
          <div className="input-group mb-4">
            <label htmlFor="title" className="label">제목</label>
            <input type="text" id="title" name="title" className="input" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="startDate" className="label">시작일</label>
            <input type="date" id="startDate" name="startDate" className="input" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="endDate" className="label">종료일</label>
            <input type="date" id="endDate" name="endDate" className="input" value={formData.endDate} onChange={handleChange} required />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="time" className="label">시간</label>
            <input type="time" id="time" name="time" className="input" value={formData.time} onChange={handleChange} />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="location" className="label">장소</label>
            <input type="text" id="location" name="location" className="input" value={formData.location} onChange={handleChange} />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="description" className="label">내용</label>
            <textarea id="description" name="description" className="input" value={formData.description} onChange={handleChange}></textarea>
          </div>
          
          <div className="button-group">
            <button type="submit" className="submit-btn">등록</button>
            <button type="button" className="reset-btn" onClick={handleReset}>리셋</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
