import React from 'react';
import styles from './ModelDetail.module.css'; 
// import { Style } from '@material-ui/icons';

function Breadcrumb() {
  return (
    <nav className={styles.breadcrumb}>
      <a href="/">Home</a> &gt; <a href="/shop">Shop</a> &gt; <a href="/shop/products-type">Products type</a> &gt; Detail
    </nav>
  );
}

export default Breadcrumb;