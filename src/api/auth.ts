import API from "../lib/axios";

export const registerUser=async({
     name,
     email,
     password,
}:{
     name: string;
     email: string;
     password:string;
}) =>{
    try{
        const res =await API.post('/auth/register',{
           name,
           email,
           password, 
        })
        return res.data
    }catch(err:any){
        const message =err.response?.data?.message || 'Fail to register'
        throw new Error(message);

    }
}
 export const loginUser=async(Credential:{
    email:string;
    password:string;
 })=>{
    try{
        const res=await API.post('/auth/login',
            Credential );
            return res.data;
    }catch (err:any){
          const message =err.response?.data?.message || 'Fail to Login'
        throw new Error(message);

    }
 }

export const logoutUser=async()=>{
    try{
        await API.post('/auth/logout');
    }catch(err:any){
        const message =err.response?.data?.message || 'Fail to Logout'
        throw new Error(message);

    }
}
export const refreshAccessToken=async()=>{
    try{
        const res= await API.post('/auth/refresh');
        return res.data;

    }catch(err:any){
        const message =err.response?.data?.message || 'Fail to refresh access token'
        throw new Error(message);

    }
}