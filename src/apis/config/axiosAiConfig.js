import axios from 'axios';

const baseURL = "http://jintudy-gh2-env.eba-gsu52njz.ap-northeast-2.elasticbeanstalk.com" //개발
//const baseURL = "http://localhost:8080" //로컬

// Axios 인스턴스 생성
const axiosAiApi = axios.create({
  baseURL: `${baseURL}`, // 기본 URL 설정
});

export default axiosAiApi;