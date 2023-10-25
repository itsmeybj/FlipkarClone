import { GET_PRODUCT_DETAIL_FAIL, GET_PRODUCT_DETAIL_REQUEST, GET_PRODUCT_DETAIL_RESET, GET_PRODUCT_DETAIL_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_SUCCESS } from "../constants/productConstant"

export const productReducer=(state = {products : []},action)=>{
    switch(action.type){
        case  GET_PRODUCT_SUCCESS:
            return {products : action.payload}
        case GET_PRODUCT_FAIL:
            return {error : action.payload}
        default :
            return state;
    }
}

export const getProductDetailReducer=(state = {product : {}},action)=>{
    switch(action.type){
        case GET_PRODUCT_DETAIL_REQUEST:
            return {loading:true}
        case  GET_PRODUCT_DETAIL_SUCCESS:
            return {loading : false, product : action.payload}
        case GET_PRODUCT_DETAIL_FAIL:
            return {loading:false,error : action.payload}
        default :
            return state;
    }
}