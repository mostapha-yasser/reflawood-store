import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import handleError from "./errorHandler";

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}
export const setupInterceptors =  (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(
     (config) => {
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError<ErrorResponse | string>) => {
      handleError(error);

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
