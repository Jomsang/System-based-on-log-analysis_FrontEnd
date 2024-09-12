import axiosAiApi from "./config/axiosAiConfig";

// chat select
export const selectChat = async (pUserId) => {
  try {
    const response = await axiosAiApi.post('/chatJpa/selectChat', { userId: pUserId });
    console.log("응답 selectChat", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};


// chat insert 및 update
export const insertChat = async (updatedCurrentChat) => {
  try {
    const response = await axiosAiApi.post('/chatJpa/insertChatMessages', updatedCurrentChat);
    console.log("응답 insertChat", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};


// chat delete
export const deletechat = async (pUserId, pChatId) => {
  try {
    const response = await axiosAiApi.post('/chatJpa/deleteChat', { userId: pUserId, pChatId });
    console.log("응답 deletechat", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};


// get AIMessage
export const getAiMessages = async (newUserMessage) => {
  try {
    const response = await axiosAiApi.post('/chatJpa/getAiMessages', { userMessage: newUserMessage });
    console.log("응답 getAiMessages", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
};