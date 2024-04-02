import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/posts";

export const createPostAPI = async (postData) => {
  console.log("postData: ", postData);
  const response = await axios.post(BASE_URL + "/create", postData);
  return response.data;
};

export const getPostAPI = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
