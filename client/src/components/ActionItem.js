import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography, styled, Button, Grid } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
import { payUsingPaytm } from "../services/api";
import { post } from "../utils/paytm";

const LeftContainer = styled(Box)`
    min-width:40%;
    padding:40px 0 0 80px;
    
`
const Image = styled('img')({
pading:"15px"
})

const StyleButton = styled(Button)`
    width:48%;
    height:50px;
    border-radius:2px;
`

const ActionItem = ({ product }) => {

    const [qty,setQty] = useState(1)

    const navigate = useNavigate();
    const dispatch = useDispatch()
    
    const goToCart=()=>{
        dispatch(addToCart(product.id,qty))
        navigate('/cart')    
    }

    const buyNow=async()=>{
        let response = await payUsingPaytm({amount:500,email:'yogeshbjadhav10@gmail.com'})
        // console.log(response);
        let information={
            action:'https://securegw-stage.paytm.in/order/process',
            params:response
        }
       console.log(information);
        post(information)
    }

     return (
        <LeftContainer>
            <Box style={{padding: '15px 20px',border : '1px solid #f0f0f0',width:'90%'}}>
                <Image src={product.detailUrl} alt="product" />
            </Box>
            <Box style={{marginTop:"7px"}}>
            <StyleButton onClick={goToCart} variant="contained" style={{marginRight:14,background:'#ff9f00'}}><ShoppingCartIcon/>Add to Cart</StyleButton>
            <StyleButton onClick={()=>buyNow()} variant="contained" style={{background:'#fb541b'}}>
                <FlashOnIcon/>
                Buy Now
                </StyleButton>
            </Box>
            </LeftContainer>
    )

}
export default ActionItem;