import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Header = styled(Box)`
    padding:15px 24px;
    background:#fff;
    border-bottom:1px solid #f0f0f0;
`
const Heading = styled(Typography)`
    color:#878787;
`
const Container = styled(Box)`
    padding:15px 24px;
    background:#fff;
    & > p{
        margin-bottom:20px;
        font-size:14px;
    }
    & > h6{
        margin-top:20px;
    }
`
const Price = styled(Box)`
    float:right;
`
const Discount = styled(Typography)`
    color:green;
    font-weight:500;
`

const TotalView = ({cartItem})=>{

    const [price,setPrice] = useState(0)
    const [discount,setDiscount] = useState(0)

    const cart = useSelector((state)=>state.cart)
    const cartItems = useSelector((state)=>state.cart.cartItem)

    const totalAmount = ()=>{
        let price=0,discount=0;
        
        cartItems.map((item)=>{
            price+=item.sum;
            discount+=(item.price.mrp-item.price.cost)
        })

        setPrice(price)
        setDiscount(discount)
    }

    useEffect(()=>{
        totalAmount()
    },[cartItem,cart])

    return(
        <Box>
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price
                    <Price component="span">₹{price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">₹{discount}</Price>
                </Typography>
                <Typography>Delivery Charges 
                    <Price component="span">40</Price>
                </Typography>
                <Typography variant="h6" style={{marginBottom:'15px'}}>Total Amount
                    <Price component="span">₹{price}</Price>
                </Typography>
                <Discount>You will save ₹{discount} on this order</Discount>
            </Container>
        </Box>
    )
}

export default TotalView;