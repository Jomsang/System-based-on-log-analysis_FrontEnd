import React from "react";
import style from "./Category.module.css";

function Category() {
  const handleImageClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className={style.container}>
      <div
        className={style.category}
        onClick={() =>
          handleImageClick(
            "https://living.hyundailivart.co.kr/index?pagecode=D100000453"
          )
        }
      >
        <img
          src="https://static.hyundailivart.co.kr/upload_mall/view/V000000005/D100000453/P000000444_S100015194.jpg?20240717095037"
          alt="가구"
        />
        <p>가구</p>
      </div>
      <div
        className={style.category}
        onClick={() =>
          handleImageClick(
            "https://remodeling.hyundailivart.co.kr/index?pagecode=D100000453"
          )
        }
      >
        <img
          src="https://static.hyundailivart.co.kr/upload_mall/view/V000000005/D100000453/P000000444_S100015506.png?20240717095037"
          alt="리모델링&시공"
        />
        <p>리모델링&시공</p>
        <span>집테리어</span>
      </div>
      <div
        className={style.category}
        onClick={() =>
          handleImageClick(
            "https://ogugagu.hyundailivart.co.kr/index?pagecode=D100000453"
          )
        }
      >
        <img
          src="https://static.hyundailivart.co.kr/upload_mall/view/V000000005/D100000453/P000000444_S100015510.png?20240717095037"
          alt="중고가구"
        />
        <p>중고가구</p>
        <span>오구가구</span>
      </div>
    </div>
  );
}

export default Category;
