import React, { useEffect } from 'react'
import { InputBase, Box, styled, Container } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import NavBar from './NavBar';
import Banner from './Banner';
import {getProducts} from '../redux/actions/productAction';

import {useDispatch, useSelector} from 'react-redux'

import Slide from '../components/Slide'
import MidSlide from './MidSlide';
import MidSection from './MidSection';

const Component = styled(Box)`
    padding:10px;
    background:#F2F2F2;
`

const Home = () => {

    const {products} = useSelector(state=>state.getProducts)
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])


    return (
        <React.Fragment>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} title="Deal of the Day" timer={true}/>
                <MidSection/>
                <Slide products={products} title="Discount for You" timer={false}/>
                <Slide products={products} title="Suggesting Items" timer={false}/>
                <Slide products={products} title="Trending Offers" timer={false}/>
            </Component>
        </React.Fragment>
    )
}

export default Home;