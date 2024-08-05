import React from "react";
import styles from "./BestSelection.module.css";

const products = [
  {
    id: 1,
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200134639/GM43588581_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "오브니 4인 패브릭 소파 화이트",
    price: "1,247,500원",
    url: "https://living.hyundailivart.co.kr/p/P200134639?pagecode=D100000457",
  },
  {
    id: 2,
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P100025857/GM40711335_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "필로시 슈퍼싱글 침대 프레임 수납형",
    price: "430,500원~",
    url: "https://living.hyundailivart.co.kr/p/P100025857?pagecode=D100000457",
  },
  {
    id: 3,
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P100034262/GM40376508_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "몰리세 4인 패브릭 리클라이너 소파 (3색)",
    price: "1,708,400원",
    url: "https://living.hyundailivart.co.kr/p/P200168513?pagecode=D100000457",
  },
  {
    id: 4,
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200100765/GM42042260_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "에스테틱 호텔형 침대 프레임 (8종)",
    price: "912,000원~",
    url: "https://living.hyundailivart.co.kr/p/P200100765?pagecode=D100000457",
  },
];

function BestSection() {
  return (
    <div className={styles.bestSection}>
      <h2 className={styles.title}>BEST</h2>
      <p className={styles.subtitle}>리바트 가구 베스트 제품을 만나보세요</p>
      <div className={styles.categories}>
        <button className={styles.categoryButton}>전체</button>
        <button className={styles.categoryButton}>소파</button>
        <button className={styles.categoryButton}>거실장/거실테이블</button>
        <button className={styles.categoryButton}>식탁</button>
        <button className={styles.categoryButton}>침대/매트리스</button>
        <button className={styles.categoryButton}>옷장/드레스룸</button>
        <button className={styles.categoryButton}>화장대/거울/스툴</button>
        <button className={styles.categoryButton}>수납장/서랍장</button>
        <button className={styles.categoryButton}>의자</button>
        <button className={styles.categoryButton}>키즈/주니어</button>
      </div>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img
              src={product.img}
              alt={product.name}
              className={styles.productImage}
              onClick={() => (window.location.href = product.url)}
            />
            <div className={styles.productInfo}>
              <span className={styles.productBrand}>{product.brand}</span>
              <p className={styles.productName}>{product.name}</p>
              <p className={styles.productPrice}>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSection;
