import React, { useState, useEffect } from 'react';
import { navigate } from 'react'; // 앱 내에서의 네비게이션에 사용됩니다.
import { fetchReservationHistory, updateReservation } from '../../service/api'; // API 호출
import { getToken, getUuid } from '../../util/token'; // 토큰 유틸리티
import { floor2Room } from '../../pages/Floor2'; // 2층의 방 이름들을 가져옵니다.
import { floor3Room } from '../../pages/Floor3'; // 3층의 방 이름들을 가져옵니다.

const MyPage = () => {
  // 컴포넌트 상태 관리를 위한 상태 훅
  const [reservations, setReservations] = useState([]); // 예약 목록을 저장합니다.
  const [loading, setLoading] = useState(false); // 비동기 작업에 대한 로딩 상태
  const [error, setError] = useState(null); // API 오류 처리를 위한 에러 상태
  const [editReservationId, setEditReservationId] = useState(null); // 편집 중인 예약의 ID
  const [editedRoomName, setEditedRoomName] = useState(''); // 편집된 방 이름 상태
  const [editedTime, setEditedTime] = useState(''); // 편집된 시간 상태

  // localStorage에서 사용자 정보를 가져옵니다.
  const userName = localStorage.getItem('userName');
  const roomId = localStorage.getItem('roomId');
  const bookDate = localStorage.getItem('bookDate');
  const bookTime = localStorage.getItem('bookTime');

  // 컴포넌트 마운트 시 토큰과 UUID를 확인합니다.
  useEffect(() => {
    const token = getToken();
    const id = getUuid();
    if (!token || !id) {
      navigate("/");
    }
  }, []);

  // 컴포넌트 마운트 시 예약 정보를 가져옵니다.
  useEffect(() => {
    const loadReservations = async () => {
      setLoading(true);
      try {
        const token = getToken();
        const id = getUuid();    
        const response = await fetchReservationHistory(id, roomId, bookDate, bookTime, token );
        console.log("Reservation History Response:", response.data)
        setReservations(response);
      } catch (err) {
        setError(err.message);
      }
    };

    loadReservations();
  }, []);

  // 예약 편집 로직
  const handleEdit = async () => {
    try {
      const token = getToken();
      const userId = getUuid();
      const _id = localStorage.getItem('_id');
      await updateReservation(roomId, userName, bookDate, bookTime, userId, _id, token); // 수정할 날짜는 예시입니다.
      console.log("Reservation History Response:", _id, token)
      // 여기에서 예약 정보를 업데이트합니다.
    } catch (err) {
      setError(err.message);
    } finally {
      setEditReservationId(null); // 편집 모드 종료
    }
  };

  // 시간 선택 옵션을 생성합니다.
  const timeOptions = Array.from({ length: 13 }, (_, index) => {
    const hour = 9 + index;
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
  });

  // 로딩 중 표시
  if (loading) return <div>Loading...</div>;
  // 에러 발생 시 표시
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>나의 예약 정보</h1>
      {reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        <ul>
          {reservations.map(reservation => (
            <li key={reservation.userid}>
              <div>방 이름: {reservation.roomId}</div> {/* 서버 응답에 따라 수정 필요 */}
              <div>예약 날짜: {reservation.bookDate}</div>
              <div>시작 시간: {reservation.bookTime}</div>
              {editReservationId === reservation.userid ? (
                <div>
                  <select value={editedRoomName} onChange={e => setEditedRoomName(e.target.value)}>
                    {[...floor2Room, ...floor3Room].map(room => (
                      <option key={room} value={room}>{room}</option>
                    ))}
                  </select>
                  <select value={editedTime} onChange={e => setEditedTime(e.target.value)}>
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <button onClick={() => handleEdit(reservation.Id)}>저장</button>
                  <button onClick={() => setEditReservationId(null)}>취소</button>
                </div>
              ) : (
                <button onClick={() => {
                  setEditReservationId(reservation.userId);
                  setEditedRoomName(reservation.roomName);
                  setEditedTime(reservation.bookTime);
                }}>수정</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPage;
