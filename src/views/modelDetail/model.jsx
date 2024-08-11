import React from 'react';
import styles from './RelatedModel.module.css'

function Model({ product }) {
  const handleClick = (redirectUrl) => {
    window.location.href = redirectUrl;
  };

  return (
    <div className ={styles.Model}>
      <img src={product.imageUrl} alt={product.name} style={{ marginRight:'50px', width: '300px', height:'70%'}} onClick={() => handleClick(product.href)} />
      <h2 style={{fontSize:'25px'}}>{product.name}</h2>
      <p style={{fontSize:'90%'}}>{product.description}</p>
      <div className={styles.descSection}>
        <span className={styles.currentPrice}>$32</span>
        <span className={styles.originalPrice}>$42</span>
        <div className='{styles.'></div>
      </div>
    </div>
  );
}

export default Model;