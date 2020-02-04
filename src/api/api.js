import axios from "axios";

const baseURL = "http://localhost:5000";

export const fetchUsers = async () => {
  const response = await axios.get(`${baseURL}/users`);
  return response.data;
};

export const loginUser = async (username, password) => {
  const loginDetails = { username, password };
  const login = await axios.post(`${baseURL}/users/login`, loginDetails, {
    withCredentials: true
  });
  return login.data;
};
