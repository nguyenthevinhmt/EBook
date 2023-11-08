import BaseUrl from "../Utils/BaseUrl";
import axios from "../Services/interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
const token = AsyncStorage.getItem("accessToken");
export const addBook = async (formData) => {
  const token = await AsyncStorage.getItem("accessToken");
  try {
    const response = await axios({
      method: "POST",
      url: `${BaseUrl}api/book/add`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
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

export const bookGetAll = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BaseUrl}/book/get-all`,
    });
    return response;
  } catch (error) {
    console.log("Lỗi");
    console.log(error.response);
    return null;
  }
};

export const getBookById = async (bookId) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BaseUrl}/book/find-by-id/${bookId}`,
    });
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
      url: `${BaseUrl}/book/get-all-like`,
    });
    return response;
  } catch (error) {
    console.log("Lỗi");
    console.log(error.response);
    return null;
  }
};

// yêu thích sách
export const favoriteBook = async (bookId) => {
  try {
    const response = await axios({
      method: "PUT",
      url: `${BaseUrl}/book/like/${bookId}`,
    });
    return response;
  } catch (error) {
    console.log("Lỗi");
    console.log(error.response);
    return null;
  }
};

export const searchBook = async (keyword) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BaseUrl}/book/get-all`,
      params: {
        Name: keyword,
      },
    });
    return response;
  } catch (error) {
    console.log("Lỗi");
    console.log(error.response);
    return null;
  }
};
