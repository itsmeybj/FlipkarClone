import { ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS, DECREASE_CART_SUCCESS, INCREASE_CART_SUCCESS, REMOVE_ALL_CART, REMOVE_FROM_CART } from "../constants/productConstant";

export const cartReducer = (state = { cartItem: [] }, action) => {

    switch (action.type) {
        case ADD_TO_CART_SUCCESS:
            const cartIndex = state.cartItem.findIndex(item => item.id === action.payload.id)
            if(cartIndex>=0){
                //cart alrady exist
                state.cartItem[cartIndex].quantity+=1;
                state.cartItem[cartIndex].sum+=action.payload.price.cost;
            }else{
                //not already exist
                const temp = { ...action.payload, quantity: 1, sum : action.payload.price.cost }
                return { ...state, cartItem: [...state.cartItem,temp] }
            }
            
        case REMOVE_FROM_CART:
            return { ...state, cartItem: state.cartItem.filter(item => item.id !== action.payload) }
        case ADD_TO_CART_FAIL:
            return { error: action.payload }
        case INCREASE_CART_SUCCESS:
            const index = state.cartItem.findIndex(item => item.id === action.payload.id)
            if (index >= 0) {
                state.cartItem[index].quantity += 1
                state.cartItem[index].sum = state.cartItem[index].sum + state.cartItem[index].price.cost;
            } 
            //console.log(state.cartItem)
            return {...state,cartItem:state.cartItem}
        case DECREASE_CART_SUCCESS:
            const ind = state.cartItem.findIndex(item => item.id === action.payload.id)
            if (ind >= 0 && (state.cartItem[ind].quantity) > 1) {
                state.cartItem[ind].quantity -= 1
                state.cartItem[ind].sum = state.cartItem[ind].sum - state.cartItem[ind].price.cost;
            }
            else {
                console.log("-1 menas not matched")
            }
            return {...state,cartItem:state.cartItem}
        case REMOVE_ALL_CART:
            return { ...state, cartItem: [] }
        default:
            return state;
    }
}