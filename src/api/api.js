import axios from "axios";
const baseURL = "http://localhost:5000";

export const loginUser = async (username, password) => {
  const loginDetails = { username, password };
  const login = await axios.post(`${baseURL}/users/login`, loginDetails, {
    withCredentials: true
  });
  return login.data;
};

export const createUser = async newUser => {
  await axios.post(`${baseURL}/users/new`, newUser, { withCredentials: true });
};

export const logout = async () => {
  await axios.post(`${baseURL}/users/logout`, {}, { withCredentials: true });
  return logout.data;
};

export const fetchSecret = async () => {
  const response = await axios.get(`${baseURL}/users/message`, {
    withCredentials: true
  });
  return response.data;
};
