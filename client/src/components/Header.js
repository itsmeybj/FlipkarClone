import React from 'react'
import { AppBar, Toolbar, Box, Typography, styled } from '@mui/material'
import Search from './Search';
import CustomeButtons from './CustomButtons';
import { Link } from 'react-router-dom';

const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';


const StyleHeader = styled(AppBar)`
    background : #2874F0;
    height:55px;
`

const Component = styled(Link)`
    margin-left : 12%;
    line-height : 0px;
    text-decoration:none;
    color:inherit;
`
const SubHeading = styled(Typography)`
    font-size : 10px;
    font-style : italic;
`

const PlusImage = styled('img')({
    height: 10,
    width: 10,
    marginLeft: 4,
})

const ButtonWrapper = styled(Box)`
    margin : 0 3% 0 3%;
`
const Header = () => {
    return (
        <StyleHeader>
            <Toolbar style={{ minHeight: 55 }}>
            
               <Component to="/">
                    <img src={logoURL} alt="logo" style={{ width: 75 }} />
                    <Box style={{ display: 'flex' }}>
                        <SubHeading>Explore{" "}
                            <Box component="span" style={{ color: '#FFE500' }}>Plus</Box>
                        </SubHeading>
                        <PlusImage src={subURL} alt="pluelogo" />
                    </Box>
                </Component>
               
                <Search />
                <ButtonWrapper>
                    <CustomeButtons />
                </ButtonWrapper>
            </Toolbar>
        </StyleHeader>
    )
}

export default Header;