import axiosSpringApi from "./config/axiosSpringConfig";

export const fetchMainData = async () => {
  try {
    const response = await axiosSpringApi.get("/main");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    throw error;
  }
};
