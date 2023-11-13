import React, { useState, useEffect } from "react";
import moment from 'moment-timezone';
import { getToken, getUuid } from '../../util/token.js';
import { bookRoom, fetchAllReservations } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { TimeCalc } from "../../util/modalUtil.js"
import "../Reservation/ReservationModal.css";

const ReservationModal = (props) => {
  const { open, close, roomname } = props;
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [bookedTimeslots, setBookedTimeslots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const id = getUuid();
    if (!token || !id) {
      navigate("/floor2");
    }
  }, [navigate]);

  const timeSlots = Array.from({ length: 12 }, (_, time) => {
    const hour = time + 9;
    return {
      label: `${hour < 10 ? '0' + hour : hour}:00`,
      value: time,
    };
  });



  useEffect(() => {
    const fetchAndFilterTodayReservations = async () => {
      console.log('fetchAndFilterTodayReservations 함수 호출됨');
      const token = getToken();
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
  
      const allReservations = await fetchAllReservations(token);
  
      // 오늘 날짜에 해당하는 예약만 필터링하고 각 방별로 예약된 시간대 관리
      const todayReservations = allReservations
        .filter((reservation) => reservation.bookDate === today && reservation.roomId === roomname)
        .map(reservation => {
          // 예약된 시작 시간을 분석하여 시간 슬롯 인덱스로 변환
          const startTime = parseInt(reservation.bookTime.split(':')[0], 10) - 9;
          console.log([`{예약 정보: 방 이름 - ${reservation.roomId}, 예약 시간 - ${reservation.bookTime}, 예약자 ID - ${reservation.userId}}`]);
          return startTime;
        });
  
      setBookedTimeslots(todayReservations);
      console.log('booked', todayReservations);
    };
    fetchAndFilterTodayReservations();
  }, [roomname]);

  
  const handleButtonClick = (hour) => {
    setSelectedButtons(prevSelectedButtons => {
      if (prevSelectedButtons.includes(hour)) {
        return prevSelectedButtons.filter(selectedHour => selectedHour !== hour);
      } else if (prevSelectedButtons.length < 2 && !bookedTimeslots.some(bookedSlot => bookedSlot.start <= hour && bookedSlot.end >= hour)) {
        return [...prevSelectedButtons, hour].sort((a, b) => a - b);
      } else {
        return [hour];
      }
    });
  };

  // Local 시간을 UTC로 변환
  const convertLocalToUTCTime = (localTime) => {
  const localTimeZone = 'Asia/Seoul'; // 서울 시간대 지정
  const momentObj = moment.tz(localTime, 'HH:mm', localTimeZone);
  if (!momentObj.isValid()) {
    console.error('Invalid local time:', localTime);
    return null;
  }
  return momentObj.utc().format('HH:mm');
};

  // UTC 시간을 Local로 변환
  const convertUTCtoLocalTime = (utcTime) => {
  const momentObj = moment.utc(utcTime, 'HH:mm');
  if (!momentObj.isValid()) {
    console.error('Invalid UTC time:', utcTime);
    return null;
  }
  return momentObj.add(9, 'hours').format('HH:mm'); // 서울 시간대로 변환
};

  // 시작 및 종료 시간 계산
  const calculateStartTime = (buttonIndex) => {
  const hour = 9 + buttonIndex;
  return hour.toString().padStart(2, '0') + ":00";
};

  const calculateEndTime = (buttonIndex) => {
  const hour = 10 + buttonIndex;
  return hour.toString().padStart(2, '0') + ":00";
};

  const handleBookingClick = async () => {
    if (selectedButtons.length === 0) {
      alert("시간을 선택해주세요!");
      return;
    }

  const bookDate = TimeCalc(new Date());
  const id = getUuid();

   // 사용자가 선택한 시간대를 UTC 시간대로 변환
  const utcTimeSlots = selectedButtons.map(buttonIndex => {
    const localStartTime = calculateStartTime(buttonIndex);
    const localEndTime = calculateEndTime(buttonIndex);
    return `${convertLocalToUTCTime(localStartTime)}-${convertLocalToUTCTime(localEndTime)}`;
  });

  // UTC 시간을 Local로 다시 변환하여 표시
  const convertedTimeSlots = utcTimeSlots.map(timeSlot => {
    const [startTime, endTime] = timeSlot.split('-');
    return {
      startTime: convertUTCtoLocalTime(startTime),
      endTime: convertUTCtoLocalTime(endTime)
    };
  });
  
      // 현지 시간대로 변환된 시간 슬롯을 "HH:mm - HH:mm" 형식의 문자열로 변환
    const bookTime = convertedTimeSlots.map(slot => `${slot.startTime} - ${slot.endTime}`).join(", ");
    try {
      const formData = {
        roomId: roomname,
        bookDate: bookDate,
        bookTime: bookTime,
        durationHours: selectedButtons.length,
        userId: id,
      };

      const response = await bookRoom(formData.bookDate, formData.bookTime, formData.durationHours, formData.roomId, formData.userId);
      alert(`예약완료: ${roomname}, ${bookDate}, 예약시간: ${bookTime}`);
      console.log("예약 성공 응답:", response);
      close();
      setSelectedButtons([]);
    } catch (error) {
      console.error("Error during booking:", error);
      alert("예약 실패: " + (error.response?.data.message || error.message));
      close();
      setSelectedButtons([]);
    }
   
  };


  return (
    <div className={open ? 'openModal modal' : 'modal'} open={open}>
      {open ? (
        <section>
          <header>
            {roomname}
            <button className="close" onClick={close}>&times;</button>
          </header>
          <main>
          {timeSlots.map((timeSlot) => {
    const isBooked = bookedTimeslots.includes(timeSlot.value);
    const isSelected = selectedButtons.includes(timeSlot.value);
    return (
      <button
        // ...
        className={`timelinebutton timeslot ${isSelected ? 'selected' : 'notselected'} ${isBooked ? 'booked' : ''}`}
        onClick={() => handleButtonClick(timeSlot.value)}
        disabled={isBooked}
      >
        {timeSlot.label}
        {isBooked && <span className="booked-label">마감</span>}
      </button>
              );
            })}
          </main>
          <footer>
            <button className="booking" onClick={handleBookingClick}>예약</button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ReservationModal;
