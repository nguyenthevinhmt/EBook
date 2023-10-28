import { BaseUrl } from "../Utils/BaseUrl";
import axios from "../Services/interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseUrl = `${BaseUrl}/users`;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      email,
      password,
    });
    const accessToken = response.data.accessToken;
    await AsyncStorage.setItem("accessToken", accessToken);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Lỗi khi xóa token:", error);
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/register`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
