import styles from './ProductInfo.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductInfo = ({ product }) => {
  const userId = localStorage.getItem('userId');
  const mdlCd = product.modelCode;

  const [quantity, setQuantity] = useState(1);
  const [likeYn, setLikeYn] = useState(null);
  const [message, setMessage] = useState('');

  const formatNumber = (value) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  useEffect( () => {
    const response =  axios.post('http://localhost:8080/like/selectLikedModelDetail', {
      userId: userId,
      mdlCd: mdlCd
    }).then(function (response) {
      console.log(response.data);
      setLikeYn(response.data);
    })
  },  [userId, mdlCd]);

  // 좋아요 버튼 클릭 시 실행
  const handleLikeButtonClick = async () => {
    try {
      if (likeYn === 'Y') {
        // DELETE 요청
        await axios.post('http://localhost:8080/like/deleteLike', {
          userId: userId,
          mdlCd: mdlCd,
        });
        setLikeYn('N'); // 상태를 'N'으로 변경
        // setMessage('좋아요를 취소했습니다.');
        // alert(message);
      } else {
        // INSERT 요청
        await axios.post('http://localhost:8080/like/insertLike', {
          userId: userId,
          mdlCd: mdlCd,
        });
        setLikeYn('Y'); // 상태를 'Y'으로 변경
        // setMessage('좋아요를 누르셨습니다.');
        // alert(message);
      }
    } catch (error) {
      console.error('Error handling like button click:', error);
    }
  };

  // likeYn 값이 변경될 때 메시지 업데이트
  // useEffect(() => {
  //   if (likeYn === 'Y') {
  //     // setMessage('좋아요를 누르셨습니다.');
  //   } else if (likeYn === 'N') {
  //     // setMessage('아직 좋아요를 누르지 않았습니다.');
  //   }
  // }, [likeYn]);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  // 렌더링
  if (!product) return <div>No data available</div>;

  return (
    <div className={styles.productInfo}>
      <h1>{product.modelName}</h1>
      <p className={styles.description}>상품코드 : {product.modelCode}</p>
      <div className={styles.priceSection}>
        <span className={styles.currentPrice}>가격 : {formatNumber(product.cost)}</span>
      </div>
      <p className={styles.additionalInfo}>색상 : {product.modelColor}</p>

      <div className={styles.optionDiv}>
        <div className={styles.qtySelector}>
          <label>Quantity</label>
          <div className={styles.quantityControls}>
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={handleLikeButtonClick} className={styles.addToBag}>
          {likeYn === 'N' ? '좋아요♡' : '좋아요♥'}
        </button>
        <button className={styles.checkout}>Checkout</button>
      </div>
    </div>
  );
};

export default ProductInfo;
