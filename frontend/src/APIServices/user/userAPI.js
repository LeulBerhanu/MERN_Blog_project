import { BASE_URL } from "../../utils/baseEndpoint";
import axios from "axios";

export const registerAPI = async (userData) => {
  console.log("userDAta", userData);
  const response = await axios.post(
    BASE_URL + "/user/register",
    {
      username: userData?.username,
      password: userData?.password,
      email: userData?.email,
    },
    {
      withCredentials: true,
    }
  );

  console.log("resgisterAPI response", response);
  return response.data;
};
