import axios from 'axios';

// const baseURL = "http://??" //개발
const baseURL = "http://localhost:5000" //로컬

// Axios 인스턴스 생성
const axiosAiApi = axios.create({
  baseURL: `${baseURL}`, // 기본 URL 설정
});

export default axiosAiApi;