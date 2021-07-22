import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import auth from "./authService";

axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

axios.interceptors.response.use(null, (error) => {
  const expectedError = error && error.status >= 400 && error.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error(error);
  }

  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
