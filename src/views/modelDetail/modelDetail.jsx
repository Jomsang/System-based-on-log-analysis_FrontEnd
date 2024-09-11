// import React, {useState} from 'react';
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
    // <div>
    //   {posts.map(post=>(
    //     <li>{post.mdlCd}</li>
    //   ))}
    // </div>
  );
}

export default ModelDetail;