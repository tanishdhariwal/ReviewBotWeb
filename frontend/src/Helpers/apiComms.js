import axios from 'axios';

export const LoginUser = async (username,password)=>{

    const response = await axios.post('/login', {
        username,
        password
    });
    if(response.status!=200){
        throw new Error(response.data);
    }
    console.log(data);
    return response.data;

}

export const SigninUser = async()=>{
    const response = await axios.post('/signup', {
        username,
        password
    });
    if(response.status!=200){
        throw new Error(response.data);
    }
    console.log(data);
    return response.data;
}


export const LogoutUser = async()=>{
    const response = await axios.post('/logout');
    if(response.status!=200){
        throw new Error(response.data);
    }
    console.log(data);
    return response.data;
}
