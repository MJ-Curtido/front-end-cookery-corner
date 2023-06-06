import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImgCarousel = ({ stuff }) => {

  return (
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={true}
        showArrows={true}
        interval={6000}
      >
        {stuff.map((img, index) => (
          <div>
            <img src={img.image} alt={img.nickName} />
          </div>
        ))}
      </Carousel>
  );
};

export default ImgCarousel;