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
    return response.data}
  } catch (error) {
    console.error("Booking error:", error);
    throw error;
  }
};

// // 예약 내역 조회
// export const fetchReservationHistory = async (id) => {
//   try {
//     // API_URL은 당신의 API 기본 URL로 가정합니다.
//     const response = await axios.get(`${API_URL}/api/books/${id}`); 
//       console.log("Reservation History Response:", response.data);

//     return response.data;// 해당 방과 시간에 대한 예약된 시간대를 반환합니다.
//   } catch (error) {
//     console.error("Error fetching booked timeslots for room:", error);
//     throw error; // 함수를 호출하는 곳에서 에러를 처리할 수 있도록 에러를 던집니다.
//   }
// };


export const fetchReservationHistory = async (id, roomId, userId, bookDate, bookTime, token) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${id}`,{
      id, roomId, userId, bookDate, bookTime
    },    {
        headers: {
          Authorization: `Bearer ${token}` // 헤더에 토큰을 포함시킴
        }
      });
    console.log("Reservation History Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservation history:", error);
    throw error;
  }
};



export const updateReservation = async (bookDate, bookTime, userId, token) => {
  try {
    const response = await axios.patch(`${API_URL}/api/books/${userId}`, {
      bookDate, bookTime, userId
    }, { headers: {
      Authorization: `Bearer ${token}` // 헤더에 토큰을 포함시킴
    }
  });
    console.log("Reservation Update Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
};


