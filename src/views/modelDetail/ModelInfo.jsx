import React from 'react';
import styles from './ModelDetail.module.css'; 

function ModelInfo() {
  return (
    <div className={styles.modelInfo}>
      <h1 className={styles.modelName}>상품명</h1>
      <p className={styles.modelDescription}>상품에 대한 설명입니다. </p>
      <div className={styles.modelPricing}>
        <span className={styles.modelPrice}>320,000</span>
        <span className={styles.modelOriginalPrice}>400,000</span>
      </div>
      <p className={styles.modelDetails}>
       상품에 대한 디테일 설명입니다.
      </p>
      <div className={styles.modelReviews}>
        <span>368 reviews</span> | <span>823 sold</span> | <span>4.5 stars</span>
      </div>
      <ul className={styles.modelBenefits}>
        <li>Free shipping on orders over $49USD</li>
        <li>Free + easy returns</li>
      </ul>
      <div className={styles.modelOptions}>
        <label htmlFor="size">Choose size</label>
        <select id="size">
          <option value="50ml">50.00 ML</option>
          <option value="100ml">100.00 ML</option>
        </select>
      </div>
      <div className={styles.modelQuantity}>
        <label htmlFor="quantity">Quantity</label>
        <button>-</button>
        <input type="number" id="quantity" value="1" readOnly />
        <button>+</button>
      </div>
      <div className={styles.modelActions}>
        <button className={styles.addToBag}>Add to bag</button>
        <button className={styles.checkout}>Checkout</button>
      </div>
    </div>
  );
}

export default ModelInfo;