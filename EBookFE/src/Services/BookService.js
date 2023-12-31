import BaseUrl from "../Utils/BaseUrl";
import axios from "../Services/interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addBook = async (formData) => {
  const token = await AsyncStorage.getItem("accessToken");
  console.log("token", token);
  axios
    .post(`${BaseUrl}/book/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("Lỗi");
      console.log(error?.response);
      return null;
    });
};

export const getBookByLikeCount = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BaseUrl}/book/get-book-by-view-count`,
    });
    return response;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách các sách xem nhiều nhất");
    console.log(error.response);
    return null;
  }
};

export const uploadBook = async (formData) => {
  const token = await AsyncStorage.getItem("accessToken");
  console.log("token", token);
  axios
    .put(`${BaseUrl}/book/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("Lỗi");
      console.log(error?.response);
      return null;
    });
};

export const deleteBook = async (bookId) => {
  const token = await AsyncStorage.getItem("accessToken");
  try {
    const response = await axios({
      method: "PUT",
      url: `${BaseUrl}/book/delete/${bookId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách sách");
    console.log(error);
    return null;
  }
};

export const bookGetAll = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  try {
    const response = await axios({
      method: "GET",
      url: `${BaseUrl}/book/get-all`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách sách");
    console.log(error);
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

export const bookFavorite = async (keyword, categoryId) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BaseUrl}/book/get-all-like`,
      params: {
        Name: keyword,
        CategoryId: categoryId,
      },
    });
    return response;
  } catch (error) {
    console.log("Lỗi");
    console.log(error.response);
    return null;
  }
};

export const bookManager = async (keyword, categoryId) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BaseUrl}/book/get-all-admin`,
      params: {
        Name: keyword,
        CategoryId: categoryId,
      },
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

export const searchBook = async (keyword, categoryId) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BaseUrl}/book/get-all`,
      params: {
        Name: keyword,
        CategoryId: categoryId,
      },
    });
    return response;
  } catch (error) {
    console.log("Lỗi");
    console.log(error.response);
    return null;
  }
};

export const listRateBooks = async (bookId) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BaseUrl}/book/get-rating-book/${bookId}`,
    });
    return response;
  } catch (error) {
    console.log("Lỗi");
    console.log(error.response);
    return null;
  }
};

export const rateBook = async (input) => {
  console.log(input);
  try {
    const response = await axios({
      method: "POST",
      data: input,
      url: `${BaseUrl}/book/add-rating-book`,
    });
    return response;
  } catch (error) {
    console.log("Lỗi");
    console.log(error.response);
    return null;
  }
};
