import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/posts";

export const createPostAPI = async (postData) => {
  const response = await axios.post(BASE_URL + "/create", postData, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchAllPosts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getPostAPI = async (postId) => {
  const response = await axios.get(BASE_URL + `/${postId}`);
  return response.data;
};

export const updatePostAPI = async (postData) => {
  const { postId, ...data } = postData;

  const response = await axios.put(BASE_URL + `/${postId}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deletePostAPI = async (postId) => {
  const response = await axios.delete(BASE_URL + `/${postId}`, {
    withCredentials: true,
  });
  return response.data;
};
