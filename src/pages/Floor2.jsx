import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getToken } from '../util/token';
import * as St from '../styles/styles';
import ReservationModal from '../components/Reservation/ReservationModal';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';

const Floor2 = () => {
  const [modalOpen, setModalOpen] = useState(false); //초기값: 모달닫기상태
  const [selectedButtons, setSelectedButtons] = useState([]); //선택된 버튼들을 배열로 모아둠
  const [roomState, setroomState] = useState(roomData); //index = roomData2(배열값)
  const [roomname, setRoomname] = useState(''); //roomname = roomData.name(방이름 초기값)
  // const [name, setName] = useState('');



  const navigate = useNavigate(); // 페이지간 이동을 위한 함수 import

  const loginname = localStorage.getItem('userName');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  //타임슬롯: 모달창 넘버버튼
  const timeSlots = Array.from({ length: 12 }, (_, time) => {
    const hour = time + 9;
    return {
      label: `${hour < 10 ? '0' + hour : hour}:00`,
      value: time,
    };
  });

  //모달 창 열기
  const handleOpenModal = (room) => {
    setModalOpen(true); //setModalOpen의 상태가 true값으로 되면서 열림
    setRoomname(room.name); //room.name을 클릭한 값의 데이터에서 받아옴
    console.log('room name:', room.name); //room.name값 받는지 콘솔로그 체크
  };

  //모달닫기
  const handleCloseModal = () => {
    setModalOpen(false); //setModalOpen 상태가 false로 되면서 닫힘
    setSelectedButtons([]); //선택된버튼들이 초기화됌
  };

  //버튼을 클릭했을때 동작
  const handleButtonClick = (hour) => {
    if (selectedButtons.includes(hour)) {
      setSelectedButtons(
        selectedButtons.filter((selectedHour) => selectedHour !== hour)
      ); // 이미 선택된 버튼이면 선택 해제
    } else if (selectedButtons.length < 2) {
      setSelectedButtons([...selectedButtons, hour]); // 선택된 버튼이 2개 미만이면 새로운 버튼 선택
    } else {
      setSelectedButtons([hour]); //그 외에는 선택된 버튼을 새로운 버튼으로 대체
    }
    console.log('Selected button value:', hour, roomname); // 선택된 방의 이름 로그로 출력
  };

  //선택 시간 업데이트 버튼 - 특정 방의 선택된 시간(selectTimes)값을 업데이트
  const handleSelectedTimes = (roomname, updatedRoomTimes) => {
    // roomname과 updatedRoomTimes를 매개변수로 받아와서
    setroomState((prevItems) =>
      prevItems.map((room) =>
        // 이전의 방 목록(prevItems)을 매핑하면서 특정 방의 이름과 일치하는 경우
        room.name === roomname
          ? // 해당 방의 선택된 시간(selectTimes)을 업데이트된 시간(updatedRoomTimes)으로 설정
            { ...room, selectTimes: updatedRoomTimes }
          : // 그렇지 않으면 이전의 방 목록을 유지
            room
      )
    );
  };

  return (
    <>
      <St.HeaderWrap>
        <St.ButtonWrapper>
          <St.Button style={{ fontSize: '50px' }}>2F </St.Button>
          <span> I </span>
          <St.Button
            style={{ color: 'lightgrey' }}
            onClick={() => {
              navigate('/Floor3'); //3층 페이지로 이동하는 이벤트함수 처리 필요함
            }}
          >
            3F
          </St.Button>
        </St.ButtonWrapper>
        <St.ButtonWrapper2>
          <St.HeaderContainer>
            <Navbar />
          </St.HeaderContainer>

          <St.Button
            style={{ fontSize: '18px', position: 'relative', top: '-2px' }}
          >
            {loginname} 인재님
          </St.Button>
        </St.ButtonWrapper2>
      </St.HeaderWrap>
      <St.Mapping>
        <Floor2img />
        <ButtonColumns>
          <ButtonsRows style={{ marginBottom: '36px' }}>
            {roomState.slice(0, 7).map(
              (
                room,
                index //예약 상태가 변경될거니까 roomState가 더 적절
              ) => (
                <St.RoomButton
                  key={index}
                  onClick={() => handleOpenModal(room)} //모달오픈동작
                  style={{
                    ...sizeHandler(room.sizeHandler),
                    ...St.colorHandler(room.colorHandler),
                  }}
                >
                  {room.name}
                </St.RoomButton>
              )
            )}
          </ButtonsRows>
          <ButtonsRows>
            {roomState.slice(7, 16).map(
              (
                room,
                index //예약 상태가 변경될거니까 roomState가 더 적절
              ) => (
                <St.RoomButton
                  key={index}
                  onClick={() => handleOpenModal(room)} //모달오픈동작
                  style={{
                    ...sizeHandler(room.sizeHandler),
                    ...St.colorHandler(room.colorHandler),
                  }}
                >
                  {room.name}
                </St.RoomButton>
              )
            )}
          </ButtonsRows>
          <ButtonsRows2>
            {roomData.slice(16, 19).map((room, index) => (
              <St.RoomButton
                key={index}
                style={{
                  ...sizeHandler(room.sizeHandler),
                  ...St.colorHandler(room.colorHandler),
                }}
              >
                {room.name}
              </St.RoomButton>
            ))}
          </ButtonsRows2>
        </ButtonColumns>
      </St.Mapping>

      {/*모달 컴퍼넌트 추가*/}
      <ReservationModal
        open={modalOpen}
        close={handleCloseModal}
        roomname={roomname}
        selectedButtons={selectedButtons}
        updateSelectTimes={handleSelectedTimes}
      >
        {timeSlots.map((timeSlot) => (
          <button
            key={timeSlot.value}
            className={`button timeslot ${
              selectedButtons && selectedButtons.includes(timeSlot.value)
                ? 'selected'
                : ''
            }`}
            onClick={() => handleButtonClick(timeSlot.value)}
          >
            {timeSlot.label}
          </button>
        ))}
      </ReservationModal>
    </>
  );
};

// 룸버튼 크기
const sizeHandler = (size) => {
  switch (size) {
    case 'large':
      return {
        width: '93px',
        height: '125px',
      };
    case 'small':
      return {
        width: '40px',
        height: '60px',
      };
    default:
      return {};
  }
};

const roomData = [
  { name: '협재', sizeHandler: 'large', colorHandler: 'green' },
  { name: '곽지', sizeHandler: 'large', colorHandler: 'green' },
  { name: '이호', sizeHandler: 'large', colorHandler: 'green' },
  { name: '함덕', sizeHandler: 'large', colorHandler: 'green' },
  { name: '월평', sizeHandler: 'large', colorHandler: 'green' },
  { name: '김녕', sizeHandler: 'large', colorHandler: 'green' },
  { name: '신양', sizeHandler: 'large', colorHandler: 'green' },
  { name: '', sizeHandler: 'large', colorHandler: 'transparent' },
  { name: '하모', sizeHandler: 'large', colorHandler: 'green' },
  { name: '화순', sizeHandler: 'large', colorHandler: 'green' },
  { name: '중문', sizeHandler: 'large', colorHandler: 'green' },
  { name: '표선', sizeHandler: 'large', colorHandler: 'green' },
  { name: 'Na1', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: 'Na2', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: 'Na3', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: '', sizeHandler: 'small', colorHandler: 'transparent' },
  { name: 'Na4', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: 'Na5', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: 'Na6', sizeHandler: 'small', colorHandler: 'yellow' },
];

// 2층 배경이미지
const Floor2img = styled.div`
  background-image: url('/img/Floor2.png');
  background-position: center;
  height: 600px;
  background-repeat: no-repeat;
`;

const ButtonsRows = styled.section`
  display: flex;
  align-items: stretch;
  max-width: 758px;
  justify-content: space-between;
  margin: auto;
`;

const ButtonsRows2 = styled.section`
  display: flex;
  align-items: stretch;
  max-width: 150px;
  justify-content: space-between;
  margin: auto;
  top: 40px;
  left: -301px;
  position: relative;
`;

const ButtonColumns = styled.section`
  position: relative;
  top: -538px;
`;


export default Floor2;
export const floor2Room = roomData.map(room => room.name);
