import React, { useContext, useState,useEffect } from "react";
import { Badge, Box, Button, Typography, styled } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginDialog from "./LoginDialog";
import Profile from "./Profile";
import { DataContext } from "../context/DataProvider";
import { Link } from 'react-router-dom'
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Wrapper = styled(Box)`
    display:flex;
    & > button,& > p, & > div{
        margin-right : 40px;
        font-size : 16px;
        align-items: center;    
    }   
`
const CartWrapper = styled(Link)`
    display:flex;
    text-decoration:none;
    color:#fff;    
`
const LoginButton = styled(Button)`
    &:hover{
        background:#ffffff;
    }
    color:#2874f0;
    background : #ffffff;
    text-transform : none;
    padding:5px 40px;
    border-radius : 2px;
    box-shadow:none;
    font-weight : 600;
    height:32px;
`

const CustomeButtons = () => {
    const cart = useSelector(state => state.cart)
    const cartItem  = useSelector(state => state.cart.cartItem)
    
    const [open, setOpen] = useState(false)
    const [quantity,setQuantity] = useState()

    const { account } = useContext(DataContext)

    const openDialog = () => {
        setOpen(true)
    }

    useEffect(()=>{
        let q=0;
        cartItem.filter(item=>q += item.quantity)   
        setQuantity(q)
        console.log('in use effect cusstom button')
    },[cartItem,quantity,cart])

    return (
        <Wrapper>
            {
                account ? <Profile /> : <LoginButton onClick={openDialog} variant="contain">Login</LoginButton>
            }
            <Typography style={{ marginTop: 3, width: 135 }}>Become a Seller</Typography>
            <Typography style={{ marginTop: 3 }}>More</Typography>
            <CartWrapper to='/cart'>
                <Badge badgeContent={quantity} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
            </CartWrapper>
            <LoginDialog open={open} setOpen={setOpen} />

        </Wrapper>
    )
}

export default CustomeButtons;