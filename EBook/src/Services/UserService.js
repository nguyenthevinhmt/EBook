import BaseUrl from "../Utils/BaseUrl";
import axios from "../Services/interceptor";

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
export const UpdateUserInfo = async (fullName, phone) => {
  try {
    const res = await axios.put(`${BaseUrl}/users/update-user-info`, {
      fullName,
      phone,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
