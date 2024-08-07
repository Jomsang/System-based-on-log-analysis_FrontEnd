import React, { useState, useEffect } from "react";
import style from "./Banner.module.css";

const slides = [
  {
    image:
      "https://static.hyundailivart.co.kr/upload_mall/view/V000000005/D100000452/P000000443_S100016459.jpg?20240805090505",
    url: "https://www.hyundailivart.co.kr/p/P200172847?pagecode=D100000452",
    heading: "아르떼 세라믹 식탁",
    subheading: "프리미엄 칸스톤 출시",
    description: "",
  },
  {
    image:
      "https://static.hyundailivart.co.kr/upload_mall/view/V000000005/D100000452/P000000443_S100016499.jpg?20240805090505",
    url: "https://living.hyundailivart.co.kr/exhibition/B200065564?pagecode=D100000452",
    heading: "자연,일상,상상을 미학으로 담아내다",
    subheading: "리바트 마이스터 컬렉션",
    description: "창조성과 기술력이 어우러진 프리미엄 가구",
  },
  {
    image:
      "https://static.hyundailivart.co.kr/upload_mall/view/V000000005/D100000452/P000000443_S100016632.jpg?20240805090505",
    url: "https://living.hyundailivart.co.kr/exhibition/B200063371?pagecode=D100000452",
    heading: "SURPRISE COUPON",
    subheading: "베스트셀러 특별 혜택전",
    description: "오늘의 깜짝 혜택을 확인해 보세요!",
  },
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

  const handleSlideClick = () => {
    window.location.href = slides[currentSlide].url;
  };

  return (
    <div className={style.container} onClick={handleSlideClick}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${style.slide} ${
            currentSlide === index ? style.active : ""
          }`}
        >
          <img src={slide.image} alt={`Slide ${index + 1}`} />
          {currentSlide === index && (
            <div className={style.bannerText}>
              <h2>{slide.heading}</h2>
              <p>{slide.subheading}</p>
              <p>{slide.description}</p>
            </div>
          )}
        </div>
      ))}
      <div className={style.buttons}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation(); // 배너의 클릭 이벤트 전파 방지
              handleSlideChange(index);
            }}
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
