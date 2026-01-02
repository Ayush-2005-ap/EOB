import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (message, sessionId) => {
  try {
    const response = await api.post('/chat/message', {
      message,
      sessionId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getConversation = async (sessionId) => {
  try {
    const response = await api.get(`/chat/conversation/${sessionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteConversation = async (sessionId) => {
  try {
    const response = await api.delete(`/chat/conversation/${sessionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;