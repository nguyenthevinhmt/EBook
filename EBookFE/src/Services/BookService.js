import BaseUrl from "../Utils/BaseUrl";
import axios from "../Services/interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
const token = AsyncStorage.getItem("accessToken");
export const addBook = async (formData) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BaseUrl}api/book/add`,
      headers: {
        "Content-Type": "multipart/form-data",
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

export const bookFavorite = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${BaseUrl}api/book/get-all`,
      });
      console.log(response.data);
      return response;
    } catch (error) {
      console.log("Lỗi");
      console.log(error.response);
      return null;
    }
  };