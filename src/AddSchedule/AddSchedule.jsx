import React, { useState } from 'react';
import './AddSchedule.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 추가합니다.

const AddSchedule = ({ onScheduleAdded }) => {
  const { date } = useParams();
  console.log(date);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    calendarType: '1',
    st_dt: date,
    ed_dt: '', 
    st_tm: '', 
    ed_tm: '',
    sche_content: '',
    sche_color: ''
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
      st_dt: date,
      ed_dt: '', 
      st_tm: '', 
      ed_tm: '',
      sche_content: '',
      sche_color: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/addSchedule', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('Schedule added successfully!');
        onScheduleAdded({ ...formData, calendarType: parseInt(formData.calendarType) });
        navigate('/calendar');
      } else {
        console.error('Failed to add schedule');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            <input type="date" id="st_dt" name="st_dt" className="input" value={formData.st_dt} onChange={handleChange} required />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="endDate" className="label">종료일</label>
            <input type="date" id="ed_dt" name="ed_dt" className="input" value={formData.ed_dt} onChange={handleChange} required />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="time" className="label">시간</label>
            <input type="time" id="st_tm" name="st_tm" className="input" value={formData.st_tm} onChange={handleChange} />
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
