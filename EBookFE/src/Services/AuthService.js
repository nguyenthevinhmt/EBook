import { BaseUrl } from "../Utils/BaseUrl";
import axios from "../Services/interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseUrl = `${BaseUrl}/users`;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`http://192.168.1.10/api/users/login`, {
      email,
      password,
    });
    // const accessToken = response.data;
    // await AsyncStorage.setItem("accessToken", accessToken);
    return response;
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
    const response = await axios.post(`${baseUrl}/register`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
