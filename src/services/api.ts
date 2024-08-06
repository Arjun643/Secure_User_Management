import axios from 'axios';

const API_URL = 'https://reqres.in/api';
export const fetchUserList = async () => {
  try {
    const response = await axios.get(`${API_URL}/users?page=2`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user list');
  }
};
export const loginUser = (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const getUserData = (token: string) => {
  return axios.get(`${API_URL}/users/1`, { headers: { Authorization: `Bearer ${token}` } });
};

export const registerUser = (userData: { email: string; password: string }) => {
  return axios.post(`${API_URL}/register`, userData);
};
