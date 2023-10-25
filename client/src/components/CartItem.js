import { Box, Button, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonGroup from '../components/ButtonGroup';
import { useDispatch,useSelector } from "react-redux";
import { removeFromCart } from "../redux/actions/cartAction";

const Component = styled(Box)`
    border-top : 1px solid #f0f0f0;
    display:flex;
    background:#fff;
`
const LeftComponent = styled(Box)`
    margin:20px;
    display:flex;
    flex-direction:column;
`

const SmallText = styled(Typography)`
    color : #878787;
    font-size:14px;
    margin-top:10px; 
`
const Remove = styled(Button)`
    margin-top:20px;
    font-size:16px;
    color:#000;
    font-weight:600;
`
const CartItem = ({item})=>{
    
    const dispatch = useDispatch()

    const removeCart=(id)=>{
        dispatch(removeFromCart(id))    
    }

    const cart = useSelector(state=>state.cart)
    const cartItem = useSelector(state=>state.cart.cartItem)
    
    const [qty,setQty] = useState()
    const [sum,setSum] = useState()

    let data;

    const showQty = ()=>{
        data = cartItem.filter(data=>data.id === item.id)
        setQty(data[0].quantity)
        setSum(data[0].sum)
        console.log(data)
    }

    useEffect(()=>{
        showQty()
        console.log('in button groupd')        
    },[dispatch,cartItem,cart])
    
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    return (
        <Component>
            <LeftComponent>
                <img src={item.url} alt="product" style={{height:110, width:110}}/>
                <ButtonGroup item={item}/>
            </LeftComponent>

            <Box style={{margin:20}}>
                <Typography>{item.title.longTitle}</Typography>
                <SmallText>Seller:RetailNet
                <Box component="span"><img src={fassured} alt="" style={{width:50,marginLeft:10}}/></Box>
                </SmallText>
                <Typography style={{margin:'20px 0'}}>
                            <Box component="span" style={{fontWeight:600,fontSize:"18px", marginRight:"7px"}}>₹{item.price.cost}</Box>
                            <Box component="span" style={{color:"#878787",marginRight:"7px" }}><strike>₹{item.price.mrp}</strike></Box>
                            <Box component="span" style={{color:'#388E3C'}}>{item.price.discount}</Box>
                            <Box component="span">{" "}( ₹{item.price.cost} x {qty} = ₹{sum} )</Box>
                        </Typography>
                <Remove onClick={()=>removeCart(item.id)}>Remove</Remove>
            </Box>
        </Component>
    )
}

export default CartItem;