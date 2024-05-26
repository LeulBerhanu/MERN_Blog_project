import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/plans";

export const createPlanAPI = async (data) => {
  const response = await axios.post(BASE_URL + "/create", data, {
    withCredentials: true,
  });
  console.log("RESPONSE,", response);
  return response.data;
};

export const fetchPlansAPI = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchPlanAPI = async (id) => {
  const response = await axios.get(BASE_URL + "/" + id);
  return response.data;
};
