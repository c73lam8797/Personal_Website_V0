import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

import './CSS/carousel.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyCarousel({media}) {
    const [index, setIndex] = useState(0);
    const [slideshowMedia,   changeImg_array] = useState([...media.map(item => {
        return (React.cloneElement(item));
    })]);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null} style={{
          width: "100%",
          height: "500px",
      }}>
          {slideshowMedia.map((img, index)=> {
            return (<Carousel.Item key={index}>
                    {img}
                    </Carousel.Item>
          )})}
      </Carousel>
    );
}
  