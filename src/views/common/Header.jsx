import React from 'react';
import styles from './Header.module.css';


const Header = () => {
  return (
    <header className={styles.container}>
    <div className={styles.logo}>
      <img src="/image/shopping.JPG" alt="Logo" />
      <span>Shopping</span>
    </div>
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search" className={styles.searchInput} />
      <button className={styles.searchButton}>
        <img src="/image/search.JPG" alt="Search" />
      </button>
      <button className={styles.cameraButton}>
        <img src="/image/camera.JPG" alt="Search" />
      </button>
    </div>
    <div className={styles.icons}>
      <img src="/image/bucket.JPG" alt="Cart" />
      <div className={styles.userProfile}>
        <img src="/image/user.JPG" alt="User Profile" />
      </div>
    </div>
    </header>
  );
};

export default Header;