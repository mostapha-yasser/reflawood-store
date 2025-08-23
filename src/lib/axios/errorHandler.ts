import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

const handleError = (error: AxiosError<ErrorResponse | string>) => {
  let toastMessage = "Something went wrong. Please try again later.";

  if (error.response) {
    const { status, data } = error.response;

    let errorMessage: string;

    if (typeof data === "string") {
      errorMessage = data;
    } else if (data && typeof data === "object") {
      errorMessage = data.message || `Error ${status}`;
    } else {
      errorMessage = `Error ${status}`;
    }

    switch (status) {
      case 400:
        toastMessage = `Bad Request: ${errorMessage}`;
        break;
      case 401:
        toastMessage = `Unauthorized: ${errorMessage}`;
        break;
      case 403:
        toastMessage = `Forbidden: ${errorMessage}`;
        break;
      case 404:
        toastMessage = `Not Found: ${errorMessage}`;
        break;
      case 408:
        toastMessage = `Request Timeout: ${errorMessage}`;
        break;
      case 429:
        toastMessage = `Too Many Requests: ${errorMessage}`;
        break;
      case 500:
        toastMessage = `Server Error: ${errorMessage}`;
        break;
      case 502:
        toastMessage = `Bad Gateway: ${errorMessage}`;
        break;
      case 503:
        toastMessage = `Service Unavailable: ${errorMessage}`;
        break;
      case 504:
        toastMessage = `Gateway Timeout: ${errorMessage}`;
        break;
      default:
        toastMessage = errorMessage;
    }
  } else if (error.code === "ERR_NETWORK") {
    toastMessage = navigator.onLine
      ? "Network Error: Server is unreachable. Please try again later."
      : "Network Error: You are offline. Please check your internet connection.";
  } else if (
    error.code === "ECONNABORTED" ||
    (error.message && error.message.includes("timeout"))
  ) {
    toastMessage = "Request timed out. Please try again.";
  } else if (error.code === "ERR_CANCELED") {
    toastMessage = "Request was cancelled.";
  } else if (error.message?.includes("CORS")) {
    toastMessage = "Cross-Origin Request Blocked: The request is not allowed.";
  } else if (error.isAxiosError) {
    toastMessage = `Request failed: ${error.message}`;
  }

 return toastMessage
};

export default handleError;
