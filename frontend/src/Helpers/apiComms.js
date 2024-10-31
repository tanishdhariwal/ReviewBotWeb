import axios from 'axios';

export const LoginUser = async (userData) => {
  const { email, password } = userData;
  const response = await axios.post(`/login`, { email, password });
  if (response.status !== 200) {
    throw new Error(response.data);
  }
  return response.data;
};

export const SignUpUser = async (userData) => {
  const { username, email, password } = userData;
  const response = await axios.post(`/signup`, { username, email, password });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
  return response.data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get(`/authstatus`);
  return res.data;
};

export const LogoutUser = async () => {
  await axios.get(`/logout`);
};

export const getChatResponse = async (text, productUrl) => {
  const response = await axios.post(`/chat_response`, { text, productUrl });
  if (response.status !== 200) {
    throw new Error(response.data);
  }
  return response.data;
};