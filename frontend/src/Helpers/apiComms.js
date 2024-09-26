import axios from 'axios';

export const LoginUser = async (userData)=>{

    const {email,password} = userData;
    console.log("email:",email,"password:",password);
    const response = await axios.post('/login', {"email":email,"password":password});
    console.log(response.status);
    if(response.status!=200){
        throw new Error(response.data);
    }
    // console.log(response.data);
    return response.data;

}


export const SignUpUser = async (userData) => {
  try {
    const { username, email, password } = userData;
    console.log("name:", username, "email:", email, "password:", password);
    
    const response = await axios.post('/signup', {"username":username,"email":email,"password":password});
    // const response = await axios.get('/');
    console.log(response.status);
    
    if (response.status !== 201) {
      throw new Error(response.data);
    }
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
  }
};
  


export const LogoutUser = async () => {
  try {
    await axios.post('/logout', {});
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};