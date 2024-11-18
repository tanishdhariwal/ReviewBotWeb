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

export const getChatResponse = async (payload) => {
  try {
    console.log('in getChatResponse')
    const response = await axios.post(`/chat_response`, payload);
    console.log('response:', response)
    return response.data;
  } catch (error) {
    console.error('Error in getChatResponse:', error)
    throw error; // Rethrow the error to be caught in the component
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
    console.error('Error in getUserDetails:', error);
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.post(`/change_password`, { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    console.error('Error in changePassword:', error);
    throw error;
  }
};

export const getUserChats = async () => {
  try {
    const response = await axios.get(`/get_user_chats`);
    return response.data;
  } catch (error) {
    console.error('Error in getUserChats:', error);
    throw error;
  }
};