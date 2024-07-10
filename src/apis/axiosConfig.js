import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:5000', // 기본 URL 설정
});

// 메시지를 가져오는 함수
export const getMessage = async () => {
  try {
    const response = await api.get('/api/hello');
    console.log("응답 text", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};
