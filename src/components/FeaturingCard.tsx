import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturingCard: React.FC = () => {
  const images = [
    '/Image Placeholder.png',
    '/Image.png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // Set to 1000 milliseconds (1 second)
  };

  return (
    <div className="card">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img id="featuredNft" src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturingCard;
