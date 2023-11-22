import BaseUrl from "../Utils/BaseUrl";
import axios from "../Services/interceptor";

export const addBook = async (formData) => {
  axios
    .post(`${BaseUrl}/book/add`, formData)
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
  axios
    .put(`${BaseUrl}/book/update`, formData)
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
  try {
    const response = await axios({
      method: "PUT",
      url: `${BaseUrl}/book/delete/${bookId}`,
    });
    return response;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách sách");
    console.log(error);
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
        Index: 25,
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
