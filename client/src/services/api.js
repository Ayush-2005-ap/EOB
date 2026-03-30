import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for JWT tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const adminLogin = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const getAdminProfile = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};

// RESOURCES
export const fetchResources = async () => {
    const response = await api.get("/resources");
    return response.data;
};

export const fetchResourceById = async (id) => {
    const response = await api.get(`/resources/${id}`);
    return response.data;
};

export const createResource = async (data) => {
    const response = await api.post("/resources", data);
    return response.data;
};

export const updateResource = async (id, data) => {
    const response = await api.put(`/resources/${id}`, data);
    return response.data;
};

export const deleteResource = async (id) => {
    const response = await api.delete(`/resources/${id}`);
    return response.data;
};

// RANKINGS
export const fetchRankings = async () => {
    const response = await api.get("/ranking");
    return response.data;
};

export const updateRanking = async (slug, data) => {
    const response = await api.put(`/ranking/${slug}`, data);
    return response.data;
};

// NEWS
export const fetchNews = async () => {
    const response = await api.get("/news");
    return response.data;
};

export const createNews = async (data) => {
    const response = await api.post("/news", data);
    return response.data;
};

export const deleteNews = async (id) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
};

// CHAT
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