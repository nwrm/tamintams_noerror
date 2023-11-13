import axios from "axios";

// const API_URL = "http://54.180.31.53:8080";
const API_URL = "http://3.36.132.186:8000";


// 최종 예약하기 #건녕님 코드
export const bookRoom = async (bookDate, bookTime, durationHours, roomId, userId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/books`,{
        bookDate,
        bookTime,
        durationHours,     
        roomId,
        userId,
       
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰을 포함시킴
        }
      }
    );   
    
    if (response.status === 201) {
    console.log("Booking Response:", response.data);
    localStorage.setItem('reservationId', response.data._id);
    console.log(response.data._id);
    return response.data}
  } catch (error) {
    console.error("Booking error:", error);
    throw error;
  }
};


export const fetchReservationHistory = async (_id, token) => {
  try {
    // GET 요청에서는 요청 본문이 필요 없으므로 제외합니다.
    const response = await axios.get(`${API_URL}/api/books/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}` // 토큰만 포함
      }
    });
    console.log("Reservation History Response:", response.data); // 응답 로그
    return response.data;
  } catch (error) {
    console.error("Error fetching reservation history:", error);
    throw error;
  }
};


// 예약 삭제 함수
export const deleteReservation = async (reservationId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/api/books/${reservationId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    // 에러 핸들링: error 객체 또는 error 메시지를 반환할 수 있습니다.
    console.error('Reservation deletion error:', error);
    throw error;
  }
};


//전체예약조회
export const fetchAllReservations = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/books`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; 
    // 전체 예약 데이터 반환
  } catch (error) {
    console.error("Error fetching all reservations:", error);
    throw error;
  }
};










//예약 수정하기
// export const editReservation = async (bookDate, bookTime, userId, token) => {
//   try {
//     const response = await axios.patch(`${API_URL}/api/books/${userId}`, {
//       bookDate, bookTime, userId
//     }, { headers: {
//       Authorization: `Bearer ${token}` // 헤더에 토큰을 포함시킴
//     }
//   });
//     console.log("Reservation Update Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating reservation:", error);
//     throw error;
//   }
// };
