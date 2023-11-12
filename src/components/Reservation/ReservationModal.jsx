import React, { useState, useEffect } from "react";
import moment from 'moment-timezone';
import { getToken, getUuid } from '../../util/token.js';
import { bookRoom } from "../../service/api";
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
    // 예약 성공 후, 응답에서 받은 예약 정보 고유 ID를 로컬 스토리지에 저장
    if (response && response.data && response.data._id) {
      localStorage.setItem('reservationId', response.data._id);
    }


    } catch (error) {
      console.error("Error during booking:", error);
      alert("예약 실패: " + (error.response?.data.message || error.message));
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
              const isBooked = bookedTimeslots.some(bookedSlot => bookedSlot.start <= timeSlot.value && bookedSlot.end >= timeSlot.value);
              const isSelected = selectedButtons.includes(timeSlot.value);
              return (
                <button
                  key={timeSlot.value}
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
