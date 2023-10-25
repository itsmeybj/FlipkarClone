import {products} from '../../constants/data'
import { ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS, DECREASE_CART_SUCCESS, INCREASE_CART_SUCCESS, REMOVE_ALL_CART, REMOVE_FROM_CART } from '../constants/productConstant'

export const addToCart=(id,quantity)=>(dispatch)=>{
    try{
        const data = products.filter(item=>item.id === id)
        const obj = {...data[0],quantity}
        //console.log(obj);
        dispatch({type:ADD_TO_CART_SUCCESS,payload:obj})
    }catch(error){
        dispatch({type:ADD_TO_CART_FAIL,payload:error.message})
    }
}

export const removeFromCart=(id)=>(dispatch)=>{
    dispatch({type:REMOVE_FROM_CART, payload : id})
}

export const increaseCart=(item)=>(dispatch)=>{
    dispatch({type:INCREASE_CART_SUCCESS,payload:item})
}
export const decreaseCart=(item)=>(dispatch)=>{
    dispatch({type:DECREASE_CART_SUCCESS,payload:item})
}
export const removeAllCart=()=>(dispatch)=>{
    dispatch({type:REMOVE_ALL_CART})
}