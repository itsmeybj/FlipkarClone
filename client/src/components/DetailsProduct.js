import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetailAction } from '../redux/actions/productAction';
import { AppBar, Toolbar, Box, Typography, styled, Button, Grid, Badge, TableBody, TableRow, TableCell, Table } from '@mui/material'
import ActionItem from "./ActionItem";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Component = styled(Box)`
    background : #F2F2F2;
`

const Container = styled(Grid)(({theme})=>({
    background: "#FFFFFF",
    display:"flex",
    [theme.breakpoints.down('md')]:{
        margin:0
    }
}))

const RightContainer = styled(Grid)`
    margin-top : 50px;
    padding-left : 10px;
`

const SmallText = styled(Box)`
    font-size:14px;
    vertical-align:baseline;
    & > p{
        font-size:14px;
        margin-top:10px;
    }
`

const StyledBadge = styled(LocalOfferIcon)`
    margin-right:10px;
    color:#00CC00;
    font-size:15px;
`

const ColumnText = styled(TableRow)`
    font-size:14px;
    vertical-align:baseline;
    &>td{
        font-size:14px;
        margin-top:10px;
    }
`

const DetailsProducts = () => {

    const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)

    const { productId } = useParams()

    const dispatch = useDispatch()

    const { loading, product } = useSelector(state => state.getProductDetail)

    useEffect(() => {
        //if here data get infinate loop then use if conition
        dispatch(getProductDetailAction(productId))
    }, [dispatch, productId])

    
const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    return (
        <Component>           
            {              
                Object.keys(product).length > 0 &&
                // product.map((product)=>{
                    <Container container>
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                       <ActionItem product={product}/>
                    </Grid>

                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                        <Typography>{product.title.longTitle}</Typography>
                        <Typography style={{marginTop:5, color:"#878787", fontSize:14 }}>
                            8 Rating & 1 Review
                            <Box component="span">
                                <img src={fassured} alt="img" style={{width:77,marginLeft:20}}/>
                            </Box>
                        </Typography>
                        <Typography>
                            <Box component="span" style={{fontSize:28,marginRight:"7px"}}>₹{product.price.cost}</Box>
                            <Box component="span" style={{color:"#878787",marginRight:"7px" }}><strike>₹{product.price.mrp}</strike></Box>
                            <Box component="span" style={{color:'#388E3C'}}>{product.price.discount}</Box>
                        </Typography>
                        <SmallText>
                            <Typography><StyledBadge/>10% Instant Discount on Axis Bank Credit Card EMI Txns, up to ₹1500, on orders of ₹5,000 and aboveT&C</Typography>
                            <Typography><StyledBadge/>Flat ₹100 Cashback on Paytm Wallet. Min Order Value ₹1,000. Valid once per Paytm accountT&C</Typography>
                            <Typography><StyledBadge/>Flat ₹100 Cashback on Paytm Wallet. Min Order Value ₹1,000. Valid once per Paytm accountT&C</Typography>
                            <Typography><StyledBadge/>Sign-up for Flipkart Pay Later & get free Times Prime Benefits worth ₹10,000*Know More</Typography>
                            <Typography><StyledBadge/>Purchase now & get 1 surprise cashback coupon in FutureKnow More</Typography>
                        </SmallText>
                        <Table>
                        <TableBody>
                            <ColumnText>
                                <TableCell style={{color:'#878787'}}>Delivery</TableCell>
                                <TableCell style={{fontWeight:600}}>Delivery by {date.toDateString()} | ₹40</TableCell>
                            </ColumnText>
                            
                            <ColumnText>
                                <TableCell style={{color:'#878787'}}>Waranty</TableCell>
                                <TableCell>No Waranty</TableCell>
                            </ColumnText>

                            <ColumnText>
                                <TableCell style={{color:'#878787'}}>Seller</TableCell>
                                <TableCell>
                                    <Box component="span" style={{color:'#2874f0'}}>SuperComNet</Box>
                                    <Typography>GST Invoice available</Typography>
                                    <Typography>View more sellter starting from ₹{product.price.cost}</Typography>
                                </TableCell>
                            </ColumnText>
                            
                            <ColumnText>
                                <TableCell colSpan={2}>
                                    <img src={adURL} style={{width:390}} alt="img" />
                                </TableCell>
                            </ColumnText>

                            <ColumnText>
                                <TableCell style={{color:'#878787'}}>Discription</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </ColumnText>

                        </TableBody>
                        </Table>
                    </RightContainer>

                </Container>

                // })
            }
        </Component>
    )
}

export default DetailsProducts;