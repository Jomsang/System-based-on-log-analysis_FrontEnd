import React from 'react';
import styles from './BreadCrumb.module.css'; 

const Breadcrumb = ({product}) => {
  return (
    <div className={styles.breadcrumb}>
      <a href="/">Home</a> &gt; <a href="/shop">Shop</a> &gt; <a href="/products-type">Products type</a> &gt; {product.categoryId}
    </div>
  );
};

export default Breadcrumb;