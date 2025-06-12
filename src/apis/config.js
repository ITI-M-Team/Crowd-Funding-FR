// src/apis/config.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8001/api",
});

// ✅ ضيفي التوكن تلقائيًا لكل طلب
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default instance;
