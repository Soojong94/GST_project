import React, { useEffect, useState } from 'react';
import './AddSchedule.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../sidebar-02/sidebar';
import '../App.css'

const AddSchedule = ({ onScheduleAdded }) => {
  const { date } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    calendarType: '',
    st_dt: date,
    ed_dt: '',
    st_tm: '',
    ed_tm: '',
    sche_content: '',
    user_id: '',
  });

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const response = await axios.get('/session', { withCredentials: true });
        const { user_id, clan_boss } = response.data;
        const calendarType = clan_boss === 'y' ? '2' : '1';
        setFormData((prevState) => ({
          ...prevState,
          user_id: user_id,
          calendarType: calendarType,
        }));
      } catch (error) {
        console.error('Error retrieving session data:', error);
      }
    };

    getSessionData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/addSchedule', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
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

  const handleReset = () => {
    setFormData({
      calendarType: '',
      st_dt: date,
      ed_dt: '',
      st_tm: '',
      ed_tm: '',
      sche_content: '',
      user_id: '',
    });
  };

  const handleCancel = () => {
    navigate('/calendar');
  };

  return (
    <div>
      <Sidebar />

      <div className="form-container main_calendar">
        <div className="form p-4 md:p-8 mx-auto md:max-w-md">
          <div className="header mb-4 md:mb-6">
            <h2 className="text-2xl font-bold">일정 등록</h2>
          </div>
          <form id="schedule-form" onSubmit={handleSubmit}>
            <div className="input-group mb-4">
              <label htmlFor="calendar-type" className="label">캘린더 종류</label>
              <select id="calendar-type" name="calendarType" className="input" value={formData.calendarType} onChange={handleChange}>
                <option value="1">개인 일정</option>
                {formData.calendarType === '2' && (
                  <option value="2">클랜 일정</option>
                )}
              </select>
            </div>
            <input type="hidden" name="date" value={date} />
            <div className="input-group mb-4">
              <label htmlFor="startDate" className="label">시작일</label>
              <input type="date" id="st_dt" name="st_dt" className="input" value={formData.st_dt} onChange={handleChange} required />
            </div>
            <div className="input-group mb-4">
              <label htmlFor="endDate" className="label">종료일</label>
              <input type="date" id="ed_dt" name="ed_dt" className="input" value={formData.ed_dt} onChange={handleChange} required />
            </div>
            <div className="input-group mb-4">
              <label htmlFor="time" className="label">시작시간</label>
              <input type="time" id="st_tm" name="st_tm" className="input" value={formData.st_tm} onChange={handleChange} />
            </div>
            <div className="input-group mb-4">
              <label htmlFor="time" className="label">종료시간</label>
              <input type="time" id="ed_tm" name="ed_tm" className="input" value={formData.ed_tm} onChange={handleChange} />
            </div>
            <div className="input-group mb-4">
              <label htmlFor="content" className="label">내용</label>
              <textarea id="content" name="sche_content" className="input" value={formData.sche_content} onChange={handleChange} required />
            </div>
            <div className="button-group mt-8">
              <button type="submit" className="btn btn-primary mr-2">등록</button>
              <button type="button" className="btn btn-secondary mr-2" onClick={handleReset}>초기화</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;