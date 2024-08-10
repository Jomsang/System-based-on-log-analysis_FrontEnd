import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./BestSelection.module.css";

const initialProducts = [
  {
    category: "소파",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200134639/GM43588581_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "오브니 4인 패브릭 소파 화이트",
    price: "1,247,500원",
    url: "https://living.hyundailivart.co.kr/p/P200134639?pagecode=D100000457",
  },
  {
    category: "소파",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P100034262/GM40376508_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "몰리세 4인 패브릭 리클라이너 소파 (3색)",
    price: "1,708,400원",
    url: "https://living.hyundailivart.co.kr/p/P200168513?pagecode=D100000457",
  },
  {
    category: "소파",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200039535/GM43078955_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "온드 3인 패브릭 소파",
    price: "752,500원",
    url: "https://living.hyundailivart.co.kr/p/P200039535?pagecode=D100000457",
  },
  {
    category: "소파",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200089505/GM41839755_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "리르 천연면피 소가죽 소파 4인 컴팩트(3색)",
    price: "1,506,000원",
    url: "https://living.hyundailivart.co.kr/p/P200089505?pagecode=D100000457",
  },
  {
    category: "식탁",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200172847/GM43402213_img.gif/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "커스터마이징 세라믹식탁 아르떼 (408종)",
    price: "900,000원~",
    url: "https://living.hyundailivart.co.kr/p/P200172847?pagecode=D100000457",
  },
  {
    category: "식탁",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200167185/GM43291037_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "레티 6인 식탁 (6종)",
    price: "970,000원",
    url: "https://living.hyundailivart.co.kr/p/P200167185?pagecode=D100000457",
  },
  {
    category: "식탁",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P100034807/GM10113545_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "토핑 다용도 식탁의자 2개세트",
    price: "128,800원",
    url: "https://living.hyundailivart.co.kr/p/P100034807?pagecode=D100000457",
  },
  {
    category: "식탁",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200125977/GM42521471_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "루아 식탁의자 2개세트",
    price: "205,100원",
    url: "https://living.hyundailivart.co.kr/p/P200125977?pagecode=D100000457",
  },
  {
    category: "침대/매트리스",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P100025857/GM40711335_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "필로시 슈퍼싱글 침대 프레임 수납형",
    price: "430,500원~",
    url: "https://living.hyundailivart.co.kr/p/P100025857?pagecode=D100000457",
  },
  {
    category: "침대/매트리스",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200100765/GM42042260_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "에스테틱 호텔형 침대 프레임 (8종)",
    price: "912,000원~",
    url: "https://living.hyundailivart.co.kr/p/P200100765?pagecode=D100000457",
  },
  {
    category: "침대/매트리스",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200088878/GM41805991_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "엔슬립 포멀 매트리스 (SS,Q,LK)",
    price: "658,000원~",
    url: "https://living.hyundailivart.co.kr/p/P200088878?pagecode=D100000457",
  },
  {
    category: "침대/매트리스",
    img: "https://static.hyundailivart.co.kr/UserFiles/data/image/detail/PRO145/PRO14571/PRO14571_00000000_detail1_ORIGIN.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "데이지 슈퍼싱글 침대 프레임",
    price: "315,500원~",
    url: "https://living.hyundailivart.co.kr/p/P100024591?pagecode=D100000457",
  },

  {
    category: "수납장/서랍장",
    img: "https://static.hyundailivart.co.kr/UserFiles/data/image/detail/PRO145/PRO14585/PRO14585_00000000_detail1_ORIGIN.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "데이지 3단 서랍장",
    price: "231,800원",
    url: "https://living.hyundailivart.co.kr/p/P200066675?pagecode=D100000457",
  },
  {
    category: "수납장/서랍장",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200127876/GM42547255_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "에스테틱 4단 서랍장",
    price: "708,000원",
    url: "https://living.hyundailivart.co.kr/p/P200127876?pagecode=D100000457",
  },
  {
    category: "수납장/서랍장",
    img: "https://static.hyundailivart.co.kr/UserFiles/data/image/detail/PRO163/PRO16360/PRO16360_00000000_detail1_ORIGIN.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "엘로이 4단서랍장 화이트",
    price: "708,000원",
    url: "https://living.hyundailivart.co.kr/p/P100031664?pagecode=D100000457",
  },
  {
    category: "수납장/서랍장",
    img: "https://static.hyundailivart.co.kr/UserFiles/data/image/detail/PRO158/PRO15857/PRO15857_00000000_detail1_ORIGIN.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "로티르 800 주방수납장(2종)",
    price: "286,000원~",
    url: "https://living.hyundailivart.co.kr/p/P100029343?pagecode=D100000457",
  },

  {
    category: "옷장/드레스룸",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200131699/GM42712379_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "[아울렛] 한정수량★퓨리타 1000 키큰옷장 일반도어 화이트",
    price: "245,500원~",
    url: "https://living.hyundailivart.co.kr/p/P200131699?pagecode=D100000457",
  },
  {
    category: "옷장/드레스룸",
    img: "https://static.hyundailivart.co.kr/UserFiles/data/image/detail/PRO164/PRO16430/PRO16430_00000000_detail1_ORIGIN.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "토피 슬라이딩 1200 옷장 긴옷장",
    price: "352,300원",
    url: "https://living.hyundailivart.co.kr/p/P100032012?pagecode=D100000457",
  },
  {
    category: "옷장/드레스룸",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200084857/GM41703880_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "브릭 840 이동형행거 수납장(3색)",
    price: "109,400원",
    url: "https://living.hyundailivart.co.kr/p/P200084857?pagecode=D100000457",
  },
  {
    category: "옷장/드레스룸",
    img: "https://static.hyundailivart.co.kr/upload_mall/goods/P200124760/GM42491789_img.jpg/dims/resize/x320/cropcenter/320x320/autorotate/on/optimize",
    brand: "리바트",
    name: "[아울렛] 한정수량★아일 드레스룸 600 연결형",
    price: "82,700원~",
    url: "https://living.hyundailivart.co.kr/p/P200124760?pagecode=D100000457",
  },
];

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
  const nextId = useRef(1); // id 채번을 위한 useRef 사용
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    // 초기 제품 배열에 id를 추가하여 상태로 설정
    const productsWithIds = initialProducts.map((product) => ({
      ...product,
      id: nextId.current++, // 자동으로 id를 채번하여 추가
    }));
    setProducts(productsWithIds);
  }, []);

  useEffect(() => {
    // URL 쿼리 파라미터로부터 현재 카테고리를 가져옴
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "전체";
    setSelectedCategory(category);
  }, [location.search]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // 선택한 카테고리를 URL 쿼리 파라미터에 반영
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
