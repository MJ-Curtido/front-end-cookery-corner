//#region  Imports
import { Container } from '@mui/material';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
//#endregion

const CarouselCustom = ({ stuff }) => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false} showArrows={true} interval={5000}>
            {stuff.map((img, index) => (
                <Container key={index}>
                    <img src={img} />
                </Container>
            ))}
        </Carousel>
    );
};

export default CarouselCustom;
