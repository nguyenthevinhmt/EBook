import BaseUrl from "../Utils/BaseUrl";
import axios from "../Services/interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetCurrentUserInfo = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BaseUrl}/users/my-info`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
