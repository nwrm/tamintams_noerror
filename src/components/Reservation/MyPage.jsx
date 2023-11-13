import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReservationHistory, editReservation, deleteReservation} from '../../service/api'; // API 호출
import { getToken, getUuid } from '../../util/token'; // 토큰 유틸리티
import { floor2Room } from '../../pages/Floor2'; // 2층의 방 이름들을 가져옵니다.
import { floor3Room } from '../../pages/Floor3'; // 3층의 방 이름들을 가져옵니다.

const MyPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editReservationId, setEditReservationId] = useState(null);
  const [editedRoomName, setEditedRoomName] = useState('');
  const [editedTime, setEditedTime] = useState('');


  const navigate = useNavigate(); 

  useEffect(() => {
    const token = getToken();
    const id = getUuid();
    if (!token || !id) {
      navigate("/");
    }
  }, [navigate]);


  const userName = localStorage.getItem('userName');
  // 예약 정보를 가져오는 함수
  const loadReservations = async () => {
    setLoading(true);
    try {
      const _id = localStorage.getItem('reservationId');
      const token = getToken();
      if (_id && token) {
        const response = await fetchReservationHistory(_id, token);
        // 예상되는 응답이 배열이 아니라면, 배열로 변환
        const reservationData = Array.isArray(response) ? response : [response];
        setReservations(reservationData);
        localStorage.removeItem('reservationId');

        navigate('/mypage'); // '나의 정보' 페이지로 이동
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

    // 예약 삭제 로직
    const handleDelete = async (reservationId) => {
        // 사용자에게 예약 취소를 확인하는 대화상자 표시
      const confirmCancel = window.confirm('예약을 정말 취소하시겠습니까?');
      if (confirmCancel) {
        try {
          const token = getToken();
          await deleteReservation(reservationId, token);
          
          // 예약 목록을 업데이트하기 전에, 삭제된 예약 ID를 참조하지 않도록 조치
          const updatedReservations = reservations.filter(reservation => reservation._id !== reservationId);
          setReservations(updatedReservations);
        } catch (err) {
          setError(err.message);
        }
      }
    };

  // 예약 편집 로직
  const handleEdit = async (reservationId) => {
    try {
      await editReservation(reservationId);
      loadReservations(); // 예약 정보를 다시 로드합니다.
    } catch (err) {
      setError(err.message);
    }
  };

  const timeOptions = Array.from({ length: 13 }, (_, index) => {
    const hour = 9 + index;
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>나의 예약 정보</h1>
      {reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        <ul>
          {Array.isArray(reservations) && reservations.map(reservations  => (
            <li key={reservations._id}>
              <div>예약자명: {userName}</div>
              <div >회의실명: {reservations.roomId}</div>
              <div>예약날짜: {reservations.bookDate}</div>
              <div>예약시간: {reservations.bookTime}</div>
              {editReservationId === reservations._id ? (
                <div>
                  
                  <select value={editedTime} onChange={e => setEditedTime(e.target.value)}>
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <button onClick={() => handleEdit(reservations._id)}>저장</button>
                  <button onClick={() => setEditReservationId(null)}>취소</button>
                </div>
              ) : (
                <>
                <button onClick={() => handleDelete(reservations._id)}>삭제</button></>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPage;
