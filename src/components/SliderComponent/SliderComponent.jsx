import React from "react";
import Slider from "react-slick";
import { Image } from "antd";
const SliderComponent = ({ arrImage }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div style={{ padding: "5px" }}>
      <Slider {...settings}>
        {arrImage.map((image, i) => {
          return (
            <Image
              key={i}
              src={image}
              alt="slider"
              preview={false}
              width="100%"
              height="500px"
            ></Image>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
