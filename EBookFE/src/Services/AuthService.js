import { BaseUrl } from "../Utils/BaseUrl";
import axios from "../Services/interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email, password) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BaseUrl}/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    // console.log(response.data);
    const accessToken = response.data.token;
    await AsyncStorage.setItem("accessToken", accessToken);
    return response;
  } catch (error) {
    console.log("Lỗi");
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
    const response = await axios.post(`${BaseUrl}/users/register`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
    console.log("Lỗi");
  }
};
