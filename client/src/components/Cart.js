import { Box, Button, Grid, Typography, styled } from "@mui/material";
import React ,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import TotalView from "./TotalView";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { payUsingPaytm } from "../services/api";
import { post } from "../utils/paytm";
import { removeAllCart } from "../redux/actions/cartAction";

const Container = styled(Grid)`
    padding:30px 135px;
`
const Header = styled(Box)`
    padding:15px 24px;
    background:#fff;
`
const ButtonWrapper = styled(Box)`
    padding:16px 22px;
    background:#fff;
    box-shadow : 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top:1px solid #f0f0f0;
`

const StyleButton = styled(Button)`
    display:flex;
    margin-left:auto;
    background:#fb641b;
    color:#fff;
    width:250px;
    height:51px;
    border-radius : 2px;
`
const LeftContainer=styled(Grid)(({theme})=>({
    paddingRight:15,
    [theme.breakpoints.down('sm')]:{
        marginBottom:15
    }
})) 
    

const Cart = () => {

    const cart  = useSelector(state => state.cart)
    const cartItem  = useSelector(state => state.cart.cartItem)
    
    const [quantity,setQuantity] = useState()

    const dispatch = useDispatch();

    const clearCart=()=>{
        dispatch(removeAllCart())
    }
    useEffect(()=>{
        let q=0;
        cartItem.filter(item=>q += item.quantity)   
        setQuantity(q)
        console.log('in use effect cusstom button')
    },[cartItem,quantity,cart])

    const placeOrder=async()=>{
        alert("this is not yet...")
        //     let response = await payUsingPaytm({amount:500,email:'yogeshbjadhav10@gmail.com'})
    //     // console.log(response);
    //     let information={
    //         action:'https://securegw-stage.paytm.in/order/process',
    //         params:response
    //     }
    //    console.log(information);
    //     post(information)
    }

    return (
        <>
        {
            (cartItem.length) ?
                <Container container >
                    <LeftContainer item lg={9} md={9} sm={12} xs={12}>
                        <Header>
                            <Box style={{diplay:'flex'}}>
                            <Typography>
                                My Cart ({quantity})
                            </Typography>
                            <Button veriant="primary" onClick={()=>clearCart()}>Clear Cart</Button>
                            </Box>
                        </Header>
                        {
                            cartItem.map((item) => (
                                <CartItem item={item} />
                            ))
                        }
                        <ButtonWrapper>
                            <StyleButton onClick={()=>placeOrder()}>Place Order</StyleButton>
                        </ButtonWrapper>
                    </LeftContainer>

                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <TotalView cartItem={cartItem} />
                    </Grid>
                </Container>
                : <EmptyCart />
        }
        </>
    )
}
export default Cart;