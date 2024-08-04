import React, { useState, useEffect } from "react";
import style from "./Banner.module.css";

const slides = [
  "/image/bannerSlide1.jpg",
  "/image/bannerSlide2.jpg",
  "/image/bannerSlide3.jpg",
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // 3초마다 슬라이드 변경

    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={style.container}>
      {slides.map((image, index) => (
        <div
          key={index}
          className={`${style.slide} ${
            currentSlide === index ? style.active : ""
          }`}
        >
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <div className={style.buttons}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={currentSlide === index ? style.activeButton : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Banner;
