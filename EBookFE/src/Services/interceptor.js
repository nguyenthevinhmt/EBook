import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create();

const token = AsyncStorage.getItem("accessToken");
//request
instance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
// response
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response;
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
