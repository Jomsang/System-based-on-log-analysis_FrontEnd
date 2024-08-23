import axiosSpringApi from "./config/axiosSpringConfig";

// 사용자 확인 테스트 api
export const getUser = async () => {
    try {
      const response = await axiosSpringApi.get('/usersJpa/test');
      console.log("응답 text", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
};

// 로그인
export const doLogin = async (id, pw) => {
  try {
    const response = await axiosSpringApi.post('/usersJpa/login', {
      username: id,
      password: pw
    });
    console.log("응답 text", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};

// 회원가입
export const doNewUser = async (id, pw, name) => {
  try {
    const response = await axiosSpringApi.post('/usersJpa/login', {
      username: id,
      password: pw
    });
    console.log("응답 text", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};