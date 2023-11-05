import BaseUrl from "../Utils/BaseUrl";
import axios from "../Services/interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
const token = AsyncStorage.getItem("accessToken");
export const addBook = async (formData) => {
    const tokenn = token._j;
  try {
    const response = await axios({
      method: "POST",
      url: `${BaseUrl}/book/add`,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${tokenn}`,
      },
      data: formData,
    });
    // console.log(response.data);
    return response;
  } catch (error) {
    console.log("Lỗi");
    console.log(error.response);
    return null;
  }
};