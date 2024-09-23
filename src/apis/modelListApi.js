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

  // Header에서 검색 키워드 검색
  export const getSearchModel = async (keyword) => {
    try {
      const response = await axiosSpringApi.get(`/modelList/search/${keyword}`);
      console.log("doSearchProduct 응답 text", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  };

  //메인에서 카테고리 검색
  export const getCategoryModel = async (keyword) => {
    try {
      const response = await axiosSpringApi.get(`/modelList/category/${keyword}`);
      console.log("doSearchProduct 응답 text", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching message:', error);
      throw error;
    }
  };