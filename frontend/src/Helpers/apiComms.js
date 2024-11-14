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

export const checkURL = async (asinData) => {
  try {
    alert("inside checkURL but before response");
    const response = await axios.post(`/product_url_validation`, asinData);
    alert("inside checkURL but after response");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || "Validation failed.");
  }
};

export const getChatResponse = async (text, productUrl) => {
  const response = await axios.post(`/chat_response`, { text, productUrl });
  if (response.status !== 200) {
    throw new Error(response.data);
  }
  return response.data;
};

export const extractASINFromUrl = (url) => {
  const asinPattern = /\/(?:dp|product)\/([^\/]+)/i;
  const match = url.match(asinPattern);
  return match ? { "asin": match[1] } : { "asin": "false" };
};
