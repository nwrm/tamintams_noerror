// 사용자 토큰을 로컬 스토리지에 저장하고 가져오는 데 사용
// 사용자 인증 및 로그인 관련 작업에서 토큰을 저장하고 검색하는 데 사용할 수 있음
// 예를 들어, 사용자가 로그인하면 서버에서 제공하는 인증 토큰을 클라이언트 측에서 저장하고,
// 이 토큰을 나중에 서버로의 인증 및 API 요청에 사용할 수 있음

//token 가져오기
export const setToken = (token) => {
  console.log(token);
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

//id 가져오기
export const setUuid = (id) => {
  localStorage.setItem('userId', id);
};

export const getUuid = () => {
  return localStorage.getItem('userId');
};

//name 가져오기

// export const setUname = (name) => {
//   console.log(name);
//   localStorage.setItem('name', name);
// };

// export const getUname = () => {
//   return localStorage.getItem('name');
// };
