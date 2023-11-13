import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReservationHistory, deleteReservation} from '../../service/api'; // API 호출
import { getToken, getUuid } from '../../util/token'; // 토큰 유틸리티

const MyPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletedReservationIds, setDeletedReservationIds] = useState([]);  // 삭제된 예약 ID를 관리하는 새로운 state 추가(예약내역 새로고침시 삭제된 예약 api로 로딩됨)

  const navigate = useNavigate(); 

  useEffect(() => {
    const token = getToken();
    const id = getUuid();
    if (!token || !id) {
      navigate("/");
    }
  }, [navigate]);

  const userName = localStorage.getItem('userName');
  
  const loadReservations = async () => {
    setLoading(true);
    try {
      const _id = localStorage.getItem('reservationId');
      const token = getToken();
      if (_id && token) {
        const response = await fetchReservationHistory(_id, token);
        const reservationData = Array.isArray(response) ? response : [response];
        const filteredReservations = reservationData.filter(reservation => 
          !deletedReservationIds.includes(reservation._id)
        );
        setReservations(filteredReservations);
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

  const handleDelete = async (reservationId) => {
    const confirmCancel = window.confirm('예약을 정말 취소하시겠습니까?');
    if (confirmCancel) {
      try {
        const token = getToken();
        await deleteReservation(reservationId, token);
  
        setDeletedReservationIds(prevIds => [...prevIds, reservationId]);
        const updatedReservations = reservations.filter(reservation => reservation._id !== reservationId);
        setReservations(updatedReservations);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>나의 예약 정보</h1>
      {reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        <ul>
          {Array.isArray(reservations) && reservations.map(reservation => (
            <li key={reservation._id}>
              <div>예약자명: {userName}</div>
              <div>회의실명: {reservation.roomId}</div>
              <div>예약날짜: {reservation.bookDate}</div>
              <div>예약시간: {reservation.bookTime}</div>
              <button onClick={() => handleDelete(reservation._id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPage;
