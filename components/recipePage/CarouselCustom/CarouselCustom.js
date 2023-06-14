//#region  Imports
import { Container } from '@mui/material';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CSS from './CarouselCustom.module.css';
//#endregion

const CarouselCustom = ({ stuff }) => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={true} showArrows={true} interval={5000}>
            {stuff.map((img, index) => (
                <Container key={index}>
                    <img className={CSS.carousel} src={img} alt={`Carousel Image ${index}`} />
                </Container>
            ))}
        </Carousel>
    );
};

export default CarouselCustom;
