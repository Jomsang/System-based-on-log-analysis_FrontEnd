import axiosAiApi from "./config/axiosAiConfig";

// 메시지를 가져오는 함수
export const getMessage = async () => {
    try {
      const response = await axiosAiApi.get('/auth/hello');
      console.log("응답 text", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  };