import React from 'react';
import styles from './ModelList.module.css';
import { useNavigate } from "react-router-dom";
function Model({ product, logOn }) {
  const formatNumber = (value) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };
  const navigate = useNavigate();

  const handleClick = (redirectId) => {
    console.log('ModelListDetail - logOn', logOn);
    if(logOn){
      navigate("/modelDetailLogIn/"+redirectId);
    } else {
      navigate("/modelDetailLogOut/"+redirectId);
    }
      // window.location.href = "/modelDetail/"+redirectId;
  };

  return (
  <div key={product.modelCode} className={styles.productItem}>
    <img
      src={product.imagePath}
      alt={product.modelName}
      className={styles.modelImage}
      onClick={() => handleClick(product.modelCode)}
    />
    <div className={styles.productInfo}>
      <p className={styles.productName}>{product.modelName}</p>
      <p className={styles.productPrice}>{formatNumber(product.cost)}</p>
    </div>
  </div>   
  );
}

export default Model;