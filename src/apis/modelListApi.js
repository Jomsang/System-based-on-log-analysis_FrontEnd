import axiosSpringApi from "./config/axiosModelListConfig";

// 메시지를 가져오는 함수
export const getModelList = async () => {
    try {
      const response = await axiosSpringApi.get('/modelList/list');
      console.log("응답 text", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  };