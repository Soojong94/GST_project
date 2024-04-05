import React, { useEffect, useState } from 'react';
import './AddSchedule.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../sidebar-02/sidebar';
import '../App.css';

const AddSchedule = ({ onScheduleAdded }) => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState('');

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
    const fetchUserInfo = async () => {
      try {
        const userinfo = JSON.parse(sessionStorage.getItem("user"));
        if (userinfo && userinfo.user_id) {
          setUserId(userinfo.user_id);
          const dataSend = { user_id: userinfo.user_id };
          const response = await axios.post('http://localhost:5000/UserInfo', dataSend);
          setUserInfo(response.data[0]); // 사용자 정보 설정
          console.log(response.data[0]);
    
          // 클랜 보스인지 확인하여 캘린더 타입 설정
          const calendarType = userinfo.clan_boss === 'y' ? '2' : '1';
          setFormData((prevState) => ({
            ...prevState,
            user_id: userinfo.user_id, // 유저 아이디 추가
            calendarType: calendarType,
          }));
        } else {
        }
      } catch (error) {
      }
    };
    

    fetchUserInfo();
  }, [date]);

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
              {userInfo && userInfo.clan_boss === 'y' && ( // 클랜 보스인 경우에만 클랜 일정 옵션 표시
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
              <button type="button" className="btn btn-danger" onClick={handleCancel}>취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;