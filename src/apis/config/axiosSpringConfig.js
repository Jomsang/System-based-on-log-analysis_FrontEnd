import axios from 'axios';

// const baseURL = "http://??" //개발
const baseURL = "http://localhost:8080" //로컬

// Axios 인스턴스 생성
const axiosSpringApi = axios.create({
  baseURL: `${baseURL}`, // 기본 URL 설정
});

export default axiosSpringApi;