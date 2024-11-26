import axios from 'axios';
import toast from 'react-hot-toast';

export const LoginUser = async (userData) => {
  try {
    const { email, password } = userData;
    const response = await axios.post(`/login`, { email, password });
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    toast.success("Login successful!");
    return response.data;
  } catch (error) {
    toast.error("Login failed. Please try again.");
    throw error;
  }
};

export const SignUpUser = async (userData) => {
  try {
    const { username, email, password } = userData;
    const response = await axios.post(`/signup`, { username, email, password });
    if (response.status !== 201) {
      throw new Error(response.data);
    }
    toast.success("Sign up successful!");
    return response.data;
  } catch (error) {
    toast.error("Sign up failed. Please try again.");
    throw error;
  }
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
    const response = await axios.post(`/product_url_validation`, asinData);
    toast.success("Product URL is valid.");
    return response.data;
  } catch (error) {
    toast.error("URL Validation failed.");
    throw error;
  }
};

export const getChatResponse = async (payload) => {
  try {
    const response = await axios.post(`/chat_response`, payload);
    return response.data;
  } catch (error) {
    toast.error('Failed to get chat response.');
    throw error;
  }
};

export const extractASINFromUrl = (url)=>{
  // Match ASIN using a regex pattern, accounting for query strings
  const asinRegex = /\/([A-Z0-9]{10})(?=\/|$|\?)/;
  const match = url.match(asinRegex);
  return match ? { "asin": match[1] } : { "asin": "false" };
}
// export const extractASINFromUrl = (url) => {
//   const asinPattern = /\/(?:dp|product)\/([^\/]+)/i;
//   const match = url.match(asinPattern);
//   return match ? { "asin": match[1] } : { "asin": "false" };
// };

export const get_user_chat = async (UID_ASIN_PAYLOAD) => {
  try {
    const response = await axios.post(`/get_user_chat`, UID_ASIN_PAYLOAD);
    return response.data;
  } catch (error) {
    console.error('Error in get_user_chat:', error)
    throw error; // Rethrow the error to be caught in the component
  }
};

export const getUserDetails = async () => {
  try {
    const response = await axios.get(`/get_user`);
    return response.data.user;
  } catch (error) {
    toast.error('Error fetching user details.');
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.post(`/change_password`, { currentPassword, newPassword });
    toast.success("Password changed successfully.");
    return response.data;
  } catch (error) {
    toast.error('Failed to change password.');
    throw error;
  }
};

export const getUserChats = async () => {
  try {
    const response = await axios.get(`/get_user_chats`);
    return response.data;
  } catch (error) {
    toast.error('Error fetching user chats.');
    throw error;
  }
};