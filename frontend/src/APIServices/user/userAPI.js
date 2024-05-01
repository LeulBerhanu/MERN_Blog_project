import { BASE_URL } from "../../utils/baseEndpoint";
import axios from "axios";

export const registerAPI = async (userData) => {
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

  return response.data;
};

export const loginAPI = async (userData) => {
  const response = await axios.post(
    BASE_URL + "/user/login",
    {
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true, //takes the token from the cookie
    }
  );

  return response.data;
};

export const checkAuthStatusAPI = async () => {
  const response = await axios.get(BASE_URL + "/user/checkauthenticated", {
    withCredentials: true,
  });

  return response.data;
};

export const userProfileAPI = async () => {
  const response = await axios.get(BASE_URL + "/user/profile", {
    withCredentials: true,
  });

  return response.data;
};

export const logoutAPI = async () => {
  const response = await axios.post(
    BASE_URL + "/user/logout",
    {},
    {
      withCredentials: true,
    }
  );

  return response.status;
};
