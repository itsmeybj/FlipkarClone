import React from 'react'
import { Typography,Box,styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {navData} from '../constants/data'

const BoxWrapper = styled(Box)`
    display:flex;
    margin:55px 130px 0 130px;
    justify-content:space-between;
   
`

const Container = styled(Box)`
    padding:12px 8px;
    text-align:center;
`

const Text = styled(Typography)`
    font-size:14px;
    font-weight:600;
    font-family:inherit;
`

const NavBar = () => {
    return (
        <Box style={{background:'#fff'}}>
        <BoxWrapper>
            {
                navData.map(item=>(
                    <Container>
                        <img src={item.url} alt="img" style={{height:64}}/>
                        <Text>{item.text}</Text>                        
                    </Container>
                ))
            }

        </BoxWrapper>
        </Box>
    )
}

export default NavBar;