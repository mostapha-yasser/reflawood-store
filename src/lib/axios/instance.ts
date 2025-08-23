import axios from "axios";
import { setupInterceptors } from "./interceptor";

const axiosInstance = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout:1000*10
});

setupInterceptors(axiosInstance);

export default axiosInstance;