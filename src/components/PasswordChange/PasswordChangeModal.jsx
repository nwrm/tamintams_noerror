import React, { useState } from 'react';
import axios from 'axios';
import * as St from '../../styles/styles';
import './PasswordChangeModalStyles.css';
import { validatePassword } from '../../util/validation';

export default function PasswordChangeModal(props) {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'userId') {
      setUserId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handlePasswordChange = async (e) => {
    if (!validatePassword(password)) {
      alert('비밀번호는 8자 이상, 특수문자는 1개 이상 들어가야 됩니다.');
      return;
    }

    try {
      const response = await axios.post(
        'http://3.36.132.186:8000/api/auth/same2',
        {
          username: userId,
          name: name,
          newPassword: password,
        }
      );

      if (response.status === 200) {
        alert('비밀번호가 변경되었습니다.');
        setName('');
        setUserId('');
        setPassword('');
        setErrorMessage('');
        props.close();
      } else {
        alert('비밀번호 변경 실패');
      }
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      }
    }
  };

  const handleModalClose = () => {
    setName('');
    setUserId('');
    setPassword('');
    setErrorMessage('');
    props.close();
  };

  return (
    <div
      className={
        props.open
          ? 'openModal modal passwordchangemodal'
          : 'modal passwordchangemodal'
      }
    >
      {props.open ? (
        <section>
          {/* <header> */}
          {/* <button className="close" onClick={handleModalClose}>
            &times;
          </button> */}
          {/* </header> */}
          <main>
            <St.PCMTitle>비밀번호를 잊어버리셨나요?</St.PCMTitle>
            <St.PCMSubTitle>
              TamInTams에 가입했던 정보를 입력해주세요.
            </St.PCMSubTitle>
            <St.PCMSubTitle>비밀번호 재설정을 도와드립니다.</St.PCMSubTitle>
            <St.PCMRow1>
              <St.PCMInput
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="이름을 입력해주세요"
              />
            </St.PCMRow1>
            <St.PCMRow2>
              <St.PCMInput
                type="text"
                name="userId"
                value={userId}
                onChange={handleChange}
                placeholder="아이디를 입력해주세요"
              />
            </St.PCMRow2>
            <St.PCMRow3>
              <St.PCMInput
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="새로운 비밀번호를 입력해주세요"
              />
              <span className="error-message">{errorMessage}</span>{' '}
            </St.PCMRow3>
            {validatePassword(password) || (
              <St.PCMErrorMessage>
                비밀번호는 8자 이상, 특수문자는 1개 이상 들어가야 됩니다.
              </St.PCMErrorMessage>
            )}
          </main>
          <footer>
            <button className="close" onClick={handleModalClose}>
              닫기
            </button>
            <button className="change-password" onClick={handlePasswordChange}>
              확인
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}
