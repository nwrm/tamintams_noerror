import styled from 'styled-components';

// 로그인 페이지

export const LoginContainer1 = styled.div`
  width: 700px;
  height: 460px;
  margin: 0 auto;
  position: relative;
  border: 10px solid black;
  border-radius: 50px;
  border-width: 40px 5px 5px 5px;
  justify-content: center;
  display: grid;
  z-index: 1000;
  background-color: black;
  margin-top: 100px;
`;

export const LoginContainer2 = styled.div`
  border-width: 30px 0px 0px 0px;
  justify-content: center;
  display: grid;
  width: 689px;
  height: 450px;
  background-color: white;
  border-radius: 50px;
  border: 10px solid black;
`;

export const LoginRow1 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

export const LoginRow2 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 60px;
`;

export const LoginCol = styled.div`
  margin-top: 60px;
  position: relative;
  width: 400px;
  height: 400px;
`;

export const LoginAllTitle = styled.div`
  margin-top: 45px;
`;

export const LoginTitle = styled.div`
  font-weight: 500;
  font-size: 55px;
  font-weight: bold;
  text-decoration: underline;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
  text-align: center;
  color: black;
`;

export const LoginSubTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  font-weight: border;
  color: black;
  text-align: center;
`;

export const LoginButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
`;

export const LoginBar = styled.div`
  font-weight: 500;
  font-size: 22px;
  color: black;
`;

export const LoginButtons = styled.div`
  display: flex;
  left: 53%;
  color: black;
  position: absolute;
  top: 140px;
`;

export const LoginText = styled.div`
  font-size: 30px;
  color: black;
`;

export const ForgetButton = styled.button`
  font-size: 14px;
  all: unset;
  cursor: pointer;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 195px;
  left: 48%;
  font-weight: 300;
`;

export const LoginInput = styled.input`
  all: unset;
  cursor: pointer;
  margin: 0px 0 0 15px;
  width: 320px;
  height: 40px;
  font-size: 20px;
  letter-spacing: 0.15px;
  text-align: center;
  border-bottom: 3px solid;
  color: black;
  font-weight: bold;
  input:focus {
    outline: none;
    box-shadow: none !important;
  }
  &::placeholder {
    font-size: 17px;
  }
  background-color: white;
`;

// 비밀번호 관련 모달

export const PCMTitle = styled.div`
  font-weight: 400;
  font-size: 28px;
  text-align: center;
  color: rgb(2, 200, 190);
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const PCMSubTitle = styled.div`
  text-align: center;
`;

export const PCMText = styled.div``;

export const PCMInput = styled.input`
  margin-left: 40px;
  cursor: pointer;
  width: 380px;
  height: 38px;
  font-size: 15px;
  letter-spacing: 0.15px;
  text-align: center;
`;

export const PCMRow1 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  align-items: center;
`;

export const PCMRow2 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  align-items: center;
`;

export const PCMRow3 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 130px;
  align-items: center;
`;

export const PCMErrorMessage = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 8px;
  display: flex;
  transform: translate(12%);
  margin-top: 178px;
`;

// 회원가입 페이지

export const JoinContainer1 = styled.div`
  width: 700px;
  height: 650px;
  margin: 0 auto;
  position: relative;
  border: 10px solid black;
  border-radius: 50px;
  border-width: 40px 5px 5px 5px;
  justify-content: center;
  display: grid;
  z-index: 1000;
  background-color: black;
  margin-top: 20px;
`;

export const JoinContainer2 = styled.div`
  border-width: 30px 0px 0px 0px;
  background-color: white;
  justify-content: center;
  display: grid;
  width: 689px;
  height: 640px;
  border-radius: 50px;
  border: 10px solid black;
`;

export const Input = styled.input`
  all: unset;
  cursor: pointer;
  margin: 0px 0 0 11px;
  width: 320px;
  height: 40px;
  font-size: 25px;
  letter-spacing: 0.15px;
  text-align: center;
  border-bottom: 3px solid;
  color: black;
  font-weight: bold;
  input:focus {
    outline: none;
    box-shadow: none !important;
  }
  background-color: white;
`;

export const ErrorMessage = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 8px;
  display: flex;
  transform: translate(47%);
  width: 310px;
`;

export const JoinRow1 = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const JoinRow2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const JoinRow3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const JoinRow4 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const JoinSubTitle = styled.div`
  font-weight: 500;
  font-size: 31px;
  font-weight: bold;
  text-decoration: underline;
  text-underline-offset: 7px;
  text-decoration-thickness: 2px;
  color: black;
  text-align: center;
`;

export const JoinTitle = styled.div`
  font-weight: 500;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
`;

export const JoinText = styled.div`
  font-size: 18px;
  color: black;
  width: 130px;
  text-align: center;
`;

export const JoinHeader = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;
`;

export const JoinBar = styled.div`
  font-weight: 500;
  font-size: 22px;
`;

export const JoinButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
`;

export const JoinButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-left: 250px;
  margin-bottom: 30px;
`;

// 2F / 3F 버튼 디자인

export const Button = styled.div`
  background-color: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

export const HeaderWrap = styled.section`
  display: flex; //
  max-width: 1190px;
  justify-content: space-between;
  margin: auto;
  align-items: baseline;
`;

// 버튼 정렬

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 15px;
`;

export const ButtonWrapper2 = styled.div`
  display: flex;
  align-items: center;
  gap: -10px;
`;

// 회의실 버튼 디자인

export const RoomButton = styled.div`
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 9.5px;
  display: flex;
  &:active {
    filter: brightness(60%);
  }
`;

// 회의실 버튼 컬러

export const colorHandler = (color) => {
  switch (color) {
    case 'green':
      return {
        border: '2.8px solid #222222',
        color: '#ffffff',
        backgroundColor: '#02c8be',
      };
    case 'yellow':
      return {
        border: '2.2px solid #222222',
        color: '#ffffff',
        backgroundColor: '#8fdf40',
      };
    case 'transparent':
      return {
        border: '2.8px solid transparent',
        color: '#ffffff',
        backgroundColor: 'transparent', // 배경색을 투명으로 설정
      };
    default:
      return {};
  }
};

// 층별지도 감싸는 div

export const Mapping = styled.section`
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  position: relative;
`;

// 상단 헤더 정렬

export const HeaderContainer = styled.div`
  z-index: 1;
`;
