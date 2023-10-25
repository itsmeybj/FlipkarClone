import { Button, ButtonGroup, styled } from "@mui/material";
import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { decreaseCart, increaseCart } from "../redux/actions/cartAction";

const Component = styled(ButtonGroup)`
    margin-top:30px;
`
const StyleButton = styled(Button)`
    border-radius:50%;
`
const GroupButton = ({item})=>{

    const cart = useSelector(state=>state.cart)
    const cartItem = useSelector(state=>state.cart.cartItem)
    const dispatch = useDispatch()

    const [qty,setQty] = useState()
    const [sum,setSum] = useState()

    let data;

    const showQty = ()=>{
        data = cartItem.filter(data=>data.id === item.id)
        setQty(data[0].quantity)
        setSum(data[0].sum)
        console.log(data)
    }

    const incrCart=()=>{
        dispatch(increaseCart(item))    
    }

    const decrCart=()=>{
        dispatch(decreaseCart(item))
    }
    
    useEffect(()=>{
        showQty()
        console.log('in button groupd')        
    },[dispatch,cartItem,cart])
    
    return (
        <Component>
            <StyleButton onClick={()=>incrCart()}>+</StyleButton>
            <StyleButton>{qty}</StyleButton>
            <StyleButton onClick={()=>decrCart()}>-</StyleButton>
        </Component>
    )
}

export default GroupButton;