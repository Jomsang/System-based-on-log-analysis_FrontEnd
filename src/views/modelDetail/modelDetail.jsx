import React from 'react';
import BreadCrumb from './BreadCrumb';
import ModelImages from './ModelImage';
// import ModelInfo from './ModelInfo';
import styles from './ModelDetail.module.css'; 
import ProductInfo from './ProductInfo';
import RelatedModel from './RelatedModel';

const ModelDetail = () => {
  return (
    <div className={styles.modelDetail}>
      <BreadCrumb />
      <div className={styles.modelContent}>
        <ModelImages />
        <ProductInfo />
      </div>
      <div>
        <RelatedModel />
      </div>
    </div>
  );
}

export default ModelDetail;