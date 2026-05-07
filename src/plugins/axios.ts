import axios, { type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
axios.defaults.headers.common["Accept"] = "application/json";

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// PENTING: Saya mengubah `interceptors.response` menjadi `interceptors.request`.
// Interceptor untuk menambahkan header "Authorization" harus dijalankan sebelum 
// request dikirim ke server (request interceptor), bukan setelah menerima response.
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const currentToken = Cookies.get("token");

  if (currentToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${currentToken}`;
  }

  return config;
});

export default axios;
