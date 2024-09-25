import axios from 'axios';

export const LoginUser = async (email,password)=>{

    const response = await axios.post('/login', {
        email,
        password
    });
    if(response.status!=200){
        throw new Error(response.data);
    }
    console.log(data);
    return response.data;

}


export const SignUpUser = async (userData) => {
  try {
    const { username, email, password } = userData;
    console.log("username:", username, "email:", email, "password:", password);
    
    const response = await axios.post('/signup', {
      username,
      email,
      password
    });
    
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
  }
};
  


export const LogoutUser = async()=>{
    const response = await axios.post('/logout');
    if(response.status!=200){
        throw new Error(response.data);
    }
    console.log(data);
    return response.data;
}
