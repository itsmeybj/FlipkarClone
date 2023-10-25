import { GET_PRODUCT_DETAIL_FAIL, GET_PRODUCT_DETAIL_REQUEST, GET_PRODUCT_DETAIL_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_SUCCESS } from "../constants/productConstant";
import axios from "axios";
import { products } from "../../constants/data";

//note this is important -() => 

export const getProducts = () => (dispatch)=>{
    try{
        //const response = await axios.get("");
        console.log(products)
        dispatch({type:GET_PRODUCT_SUCCESS, payload : products})
    }catch(error){
        console.log(error.message)
        dispatch({type:GET_PRODUCT_FAIL, payload : error.message})
    }
}

export const getProductDetailAction = (id) => (dispatch) => {
    try{
        
        dispatch({type:GET_PRODUCT_DETAIL_REQUEST})

        const data = products.filter((item)=>{
            return item.id === id
        })
        
        
        dispatch({type:GET_PRODUCT_DETAIL_SUCCESS,payload : data[0]})

    }catch(error){
        dispatch({type:GET_PRODUCT_DETAIL_FAIL,payload : error.message})
    }
}
