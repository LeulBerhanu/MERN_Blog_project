import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/category";

export const addCategoryAPI = async (data) => {
  const response = await axios.post(BASE_URL + "/create", data, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchCategoriesAPI = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
