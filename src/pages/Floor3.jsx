import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getToken } from '../util/token';
import * as St from '../styles/styles';
import ReservationModal from '../components/Reservation/ReservationModal';
import Navbar from '../components/Navbar/Navbar';

const Floor3 = () => {
  const [modalOpen, setModalOpen] = useState(false); //초기값: 모달닫기상태
  const [selectedButtons, setSelectedButtons] = useState([]); //선택된 버튼들을 배열로 모아둠
  const [roomState, setroomState] = useState(roomData2); //index = roomData2(배열값)
  const [roomname, setRoomname] = useState(''); //roomname = roomData2.name(방이름 초기값)

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
    setSelectedButtons([]); //선택된버튼들이 초기화 됨
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
      setSelectedButtons([hour]); // 그 외에는 선택된 버튼을 새로운 버튼으로 대체
      console.log('Selected button value:', hour, roomname);
    }
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
          <St.Button style={{ fontSize: '50px' }}>3F</St.Button>
          <span> I </span>
          <St.Button
            style={{ color: 'lightgrey' }}
            onClick={() => {
              navigate('/Floor2'); //2층 페이지로 이동하는 이벤트
            }}
          >
            2F
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
        <Floor3img />
        <ButtonsSpace>
          <ButtonsColumns style={{ marginBottom: '46px' }}>
            {roomState.slice(0, 3).map((room, index) => (
              <St.RoomButton
                key={index}
                onClick={() => handleOpenModal(room)}
                style={{
                  ...sizeHandler(room.sizeHandler),
                  ...St.colorHandler(room.colorHandler),
                }}
              >
                {room.name}
              </St.RoomButton>
            ))}
          </ButtonsColumns>
        </ButtonsSpace>

        <ButtonsSpace2>
          <ButtonsColumns>
            {roomState.slice(3, 6).map((room, index) => (
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
            ))}
          </ButtonsColumns>
        </ButtonsSpace2>
        <ButtonsColumns2>
          {roomState.slice(6, 7).map((room, index) => (
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
          ))}
        </ButtonsColumns2>
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
        width: '125px',
        height: '83px',
      };
    case 'small':
      return {
        width: '62px',
        height: '58px',
      };
    case 'xlarge':
      return {
        width: '102px',
        height: '200px',
      };
    default:
      return {};
  }
};

const roomData2 = [
  { name: '다랑쉬오름', sizeHandler: 'large', colorHandler: 'green' },
  { name: '용눈이오름', sizeHandler: 'large', colorHandler: 'green' },
  { name: '따라비오름', sizeHandler: 'large', colorHandler: 'green' },
  { name: 'Na1', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: 'Na2', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: 'Na3', sizeHandler: 'small', colorHandler: 'yellow' },
  { name: '거문오름', sizeHandler: 'xlarge', colorHandler: 'green' },
];

const Floor3img = styled.div`
  background-image: url('/img/Floor3.png');
  height: 600px;
  background-repeat: no-repeat;
  background-position: center;
`;

const ButtonsColumns = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: fit-content;
`;

const ButtonsColumns2 = styled.section`
  display: flex;
  margin: auto;
  top: -460px;
  left: 156px;
  position: relative;
  width: fit-content;
`;

const ButtonsSpace = styled.section`
  position: absolute;
  top: 60px;
  left: 1050px;
`;

const ButtonsSpace2 = styled.section`
  position: absolute;
  top: 140px;
  left: 860px;
`;

export default Floor3;
export const floor3Room = roomData2.map(room => room.name);
