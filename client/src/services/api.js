import axios from 'axios'

export const authenticateSignup = async(data)=>{
    try{
        const responseObj = await axios.post('http://localhost:5000/user/register',data);
        return responseObj.data
    }catch(error){
        //console.log(error);   
        //console.log(error.response.data);     
        return error.response.data;    
    }
}

export const authenticateLogin = async(data)=>{
   
    try{
        const responseObj = await axios.post('http://localhost:5000/user/login',data);
        return responseObj.data
    }catch(error){
        //console.log(error);   
        //console.log(error.response.data);     
        return error.response.data;    
    }
}

export const payUsingPaytm = async(data)=>{
    try{
        const response = await axios.post("http://localhost:5000/payment",data)
        //console.log(response)
        return response.data;
    }catch(error){
        console.log('Error while calling Paytm API - '+ error.message)
    }
}

