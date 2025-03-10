import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import {img} from './images/data'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './Carousel'

function CarouselEffect (){
    return (
      <div>
        <Carousel
          autoPlay={true}
          infiniteLoop={false}
          showIndicators={false}
          showThumbs={false}
        >
          {img.map((image, index) => (
            <img key={index} src={image} alt={`carousel-${index}`} />
          ))}
        </Carousel>
        <div className={classes.hero__img}></div>
      </div>
    );
}

export default CarouselEffect;
