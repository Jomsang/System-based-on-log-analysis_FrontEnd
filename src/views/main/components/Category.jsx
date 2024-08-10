import React from "react";
import style from "./Category.module.css";

function Category() {
  const categories = [
    {
      name: "소파",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100018703.png?20240717132012",
      url: "https://living.hyundailivart.co.kr/c/C200000059?pagecode=D100000479&pagecode=D100000584",
    },
    {
      name: "식탁",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100018704.png?20240717132012",
      url: "https://living.hyundailivart.co.kr/c/C200000061?pagecode=D100000479&pagecode=D100000584",
    },
    {
      name: "침대/매트리스",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100018705.png?20240717132012",
      url: "https://living.hyundailivart.co.kr/c/C200000062?pagecode=D100000479&pagecode=D100000584",
    },
    {
      name: "수납장/서랍장",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100020023.png?20240717132012",
      url: "https://living.hyundailivart.co.kr/c/C400001915?pagecode=D100000584",
    },
    {
      name: "옷장/드레스룸",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100018707.png?20240717132012",
      url: "https://living.hyundailivart.co.kr/c/C200000060?pagecode=D100000479&pagecode=D100000584",
    },
  ];

  return (
    <div className={style.container}>
      {categories.map((category) => (
        <div
          key={category.name}
          className={style.category}
          onClick={() => (window.location.href = category.url)}
        >
          <img src={category.img} alt={category.name} />
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Category;
