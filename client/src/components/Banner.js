import React from 'react'
import { InputBase, Box, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import NavBar from './NavBar';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from '../constants/data';

const Image = styled('img')({
    width: '100%',
    height: 280
})

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


const BoxWrapper = styled(Box)`
    color:#2874F0;
    padding:5px;
    display:flex;
`

const Banner = () => {
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            slidesToSlide={1}
            autoPlaySpeed={2000}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            containerClass="carousel-container"
        >
            {
                bannerData.map(item => (
                    <Image src={item.url} alt="img" />
                ))
            }

        </Carousel>

    )
}

export default Banner;