import React, { useState } from 'react';
import styles from './ProductInfo.module.css';

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  return (
    <div className={styles.productInfo}>
      <h1>Product name</h1>
      <p className={styles.description}>
        Aliquip fugiat ipsum nostrud ex et eu incididunt.
      </p>
      <div className={styles.priceSection}>
        <span className={styles.currentPrice}>$32</span>
        <span className={styles.originalPrice}>$42</span>
      </div>
      <p className={styles.additionalInfo}>
        In ullamco labore mollit et exercitation fugiat exercitation minim ex sint ullamco exercitation amet officia mollit.
        Qui cillum pariatur in con.
      </p>
      <div className={styles.reviewInfo}>
        <span className={styles.reviewCnt}>368</span> <span className={styles.reviewTxt}>reviews</span>  
        <span className={styles.soldCnt}>823</span>  <span className={styles.soldTxt}>sold</span>  
        <span className={styles.reviewStar}>☆☆☆☆☆</span><span className={styles.rating}>4.5</span>
      </div>
      <div className={styles.benefits}>
        <p>✅ Free shipping on orders over $49USD</p>
        <p>✅ Free + easy returns</p>
      </div>

      <div className={styles.optionDiv}>
        <div className={styles.sizeSelector}>
          <label>Choose size</label>
          <select id="size" name="size">
            <option value="KING SIZE">KING SIZE</option>
            <option value="SINGLE SIZE">SINGLE SIZE</option>
            <option value="DOUBLE SIZE">DOUBLE SIZE</option>
          </select>
        </div>

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
        <button className={styles.addToBag}>Add to bag</button>
        <button className={styles.checkout}>Checkout</button>
      </div>
    </div>
  );
};

export default ProductInfo;