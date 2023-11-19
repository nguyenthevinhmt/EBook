import axios from "../Services/interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseUrl from "../Utils/BaseUrl";
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
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Lỗi khi xóa token:", error);
  }
};

export const register = async (email, password, userType) => {
  console.log(`${BaseUrl}/users/register`);
  try {
    const response = await axios.post(`${BaseUrl}/users/register`, {
      email,
      password,
      userType,
    });
    return response;
  } catch (error) {
    console.log(error);
    console.log("Lỗi");
  }
};
