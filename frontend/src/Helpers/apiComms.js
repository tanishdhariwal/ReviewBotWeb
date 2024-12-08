import axios from 'axios';
import toast from 'react-hot-toast';

export const LoginUser = async (userData) => {
  try {
    // const id = toast.loading("Logging in...");
    const { email, password } = userData;
    const response = await axios.post(`/login`, { email, password });
    if (response.status != 200) {
        toast.error("Invalid credintials");
    }
    toast.success("Logged in successfully");
    return response.data;
  } catch (error) {
    toast.error("Server Issue bruh.");

    throw error;
  }
};

export const SignUpUser = async (userData) => {
  const toastId = toast.loading("Signing up...", { duration: Infinity });
  try {
    const { username, email, password } = userData;
    const response = await axios.post(`/signup`, { username, email, password });
    toast.dismiss(toastId);
    if (response.status === 201) {
      toast.success("Sign up successful! Please log in.", { duration: 4000 });
    }
    return response.data;
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.message || "Sign up failed. Please try again.");

    throw error;
  }
};

export const checkAuthStatus = async () => {
  const res = await axios.get(`/authstatus`);
  return res.data;
};

export const LogoutUser = async () => {
  try {
    const response = await axios.get(`/logout`);
    if(response.status!=200){
      toast.error("unable to logout");
      throw new Error("unable to Logout")
    }
    toast.success("logout successful")
  } catch (error) {
    console.log(error);
    toast.error("an error cooured");
  }
};

export const checkURL = async (asinData) => {
  try {
    const response = await axios.post(`/product_url_validation`, asinData);
    if (!response.data.isValid) {
      toast.error("Unable to help right now");
    }
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || "Validation failed.");
    throw error;
  }
};

export const getChatResponse = async (payload) => {
  try {
    const response = await axios.post(`/chat_response`, payload);
    return response.data;
  } catch (error) {
    toast.error("Failed to get response. Please try again.");

    throw error;
  }
};

export const extractASINFromUrl = (url)=>{
  // Match ASIN using a regex pattern, accounting for query strings
  const asinRegex = /\/([A-Z0-9]{10})(?=\/|$|\?)/;
  const match = url.match(asinRegex);
  return match ? { "asin": match[1] } : { "asin": "false" };
}

export const get_user_chat = async (UID_ASIN_PAYLOAD) => {
  try {
    const response = await axios.post(`/get_user_chat`, UID_ASIN_PAYLOAD);
    return response.data;
  } catch (error) {
    toast.error("Failed to load chat history");
    throw error;
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
    toast.success("Password changed successfully");
    return response.data;
  } catch (error) {

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