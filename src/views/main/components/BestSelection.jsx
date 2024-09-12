import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./BestSelection.module.css";
import { fetchMainData } from "apis/mainPageApi"; // API 호출 파일 가져오기

const categories = [
  "전체",
  "소파",
  "식탁",
  "침대/매트리스",
  "수납장/서랍장",
  "옷장/드레스룸",
];

function BestSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollPosition = useRef(0);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMainData();
        const productsWithIds = data.map((product, index) => ({
          id: index + 1, // id 부여
          category: product.ctgId,
          img: product.imgPath,
          name: product.mdlNm,
          price: `${product.cost.toLocaleString()}원`,
          url: product.imgPath,
        }));
        setProducts(productsWithIds);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "전체";
    setSelectedCategory(category);
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, scrollPosition.current);
  }, [products]);

  const handleCategoryChange = (category) => {
    scrollPosition.current = window.scrollY;
    setSelectedCategory(category);
    navigate(`?category=${category}`);
  };

  const filteredProducts =
    selectedCategory === "전체"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className={styles.bestSection}>
      <h2 className={styles.title}>BEST</h2>
      <p className={styles.subtitle}>리바트 가구 베스트 제품을 만나보세요</p>
      <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ""
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img
              src={product.img}
              alt={product.name}
              className={styles.productImage}
              onClick={() => (window.location.href = product.url)}
            />
            <div className={styles.productInfo}>
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
