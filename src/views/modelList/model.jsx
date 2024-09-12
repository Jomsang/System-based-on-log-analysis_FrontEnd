import React from 'react';
import styles from './ModelList.module.css';

function Model({ product }) {

  const handleClick = (redirectId) => {
      window.location.href = "/modelDetail/"+redirectId;
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
      <p className={styles.productPrice}>{product.cost}</p>
    </div>
  </div>   
  );
}

export default Model;