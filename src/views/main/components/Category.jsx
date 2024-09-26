import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Category.module.css";

function Category({ logOn }) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const categories = [
    {
      name: "전체",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100018708.png?20240717132012",
      url: "", // 클릭 시 이동할 경로
    },
    {
      name: "소파",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100018703.png?20240717132012",
      url: "소파", // 클릭 시 이동할 경로
    },
    {
      name: "식탁",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100018704.png?20240717132012",
      url: "식탁", // 클릭 시 이동할 경로
    },
    {
      name: "침대/매트리스",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100018705.png?20240717132012",
      url: "침대매트리스", // 클릭 시 이동할 경로
    },
    {
      name: "수납장/서랍장",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100020023.png?20240717132012",
      url: "수납장서랍장", // 클릭 시 이동할 경로
    },
    {
      name: "옷장/드레스룸",
      img: "https://static.hyundailivart.co.kr/upload_mall/view/V000000127/D100000584/P000000455_S100018707.png?20240717132012",
      url: "옷장드레스룸", // 클릭 시 이동할 경로
    },
  ];

  const handleClick = (redirectId) => {
    console.log("Catergory - logOn", logOn);
    if (logOn) {
      navigate("/modelListLogIn?categoryKeyword=" + redirectId);
    } else {
      navigate("/modelListLogOut?categoryKeyword=" + redirectId);
    }
    // window.location.href = "/modelDetail/"+redirectId;
  };

  return (
    <div className={style.container}>
      {categories.map((category) => (
        <div
          key={category.name}
          className={style.category}
          onClick={() => handleClick(category.url)} // 경로 이동
        >
          <img src={category.img} alt={category.name} />
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Category;
