import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/", // الـ base لروابطك
  withCredentials: false, // اجعلها true فقط لو تستخدم sessions
});