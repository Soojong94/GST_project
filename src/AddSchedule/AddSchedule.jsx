import React, { useState } from 'react';
import './AddSchedule.css'; // CSS 파일 import
import { useParams, useNavigate } from 'react-router-dom'; // 라우터에서 날짜 정보를 가져오기 위해 useParams 사용

const AddSchedule = () => {
  const { date } = useParams(); // 라우터에서 날짜 정보 가져오기
  const navigate = useNavigate(); // useNavigate hook 사용하여 라우팅 처리

  // 입력 필드의 값들을 상태로 관리합니다.
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    time: '',
    location: '',
    description: ''
  });

  // 입력 필드 값이 변경될 때마다 상태 업데이트
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 취소 버튼 클릭 시 캘린더 페이지로 이동하고 입력 정보 초기화
  const handleCancel = () => {
    navigate(-1);
  };

  // reset 버튼 클릭 시 입력 정보 초기화
  const handleReset = () => {
    setFormData({
      title: '',
      startDate: '',
      endDate: '',
      time: '',
      location: '',
      description: ''
    });
  };

  // 일정 등록 폼 제출 시 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 서버에 일정 데이터를 전송하거나 다른 작업을 수행할 수 있습니다.
    console.log('일정 데이터:', formData);
    // 일정 등록 후 이전 페이지로 이동
    navigate(-1);
  };

  return (
    <div className="form-container">
      <div className="form p-4 md:p-8 mx-auto md:max-w-md">
        <div className="header mb-4 md:mb-6">
          <h2 className="text-2xl font-bold">일정 등록</h2>
        </div>
        <form id="schedule-form" onSubmit={handleSubmit}>
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
