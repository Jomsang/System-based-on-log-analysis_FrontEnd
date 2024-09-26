import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./BestSelection.module.css";
import { fetchMainData } from "apis/mainPageApi"; // API 호출 파일 가져오기

const categories = [
  { name: "전체", value: "전체" },
  { name: "소파", value: "소파" },
  { name: "식탁", value: "식탁" },
  { name: "침대/매트리스", value: "침대매트리스" }, // 탭에는 '침대/매트리스'로 표시하지만 필터링 값은 '침대매트리스'
  { name: "수납장/서랍장", value: "수납장서랍장" },
  { name: "옷장/드레스룸", value: "옷장드레스룸" },
];

function BestSelection({ logOn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollPosition = useRef(0);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleClick = (redirectId) => {
    console.log("BestSelection - logOn", logOn);
    if (logOn) {
      navigate("/modelDetailLogIn/" + redirectId);
    } else {
      navigate("/modelDetailLogOut/" + redirectId);
    }
    // window.location.href = "/modelDetail/"+redirectId;
  };

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMainData();
        const productsWithIds = data.map((product, index) => ({
          id: index + 1, // id 부여
          mdlCd: product.mdlCd,
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
    setSelectedCategory(category.value); // 필터링은 value 값을 사용
    navigate(`?category=${category.value}`);
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
            key={category.value}
            className={`${styles.categoryButton} ${
              selectedCategory === category.value ? styles.active : ""
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category.name} {/* 탭에는 사람이 읽기 좋은 이름을 표시 */}
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
              onClick={() => handleClick(product.mdlCd)}
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

export default BestSelection;
