import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="path/to/logo.png" alt="Logo" />
        <span>Shopping</span>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" />
        <button>
          <img src="path/to/search-icon.png" alt="Search" />
        </button>
        <button>
          <img src="path/to/camera-icon.png" alt="Camera" />
        </button>
      </div>
      <div className={styles.icons}>
        <img src="path/to/cart-icon.png" alt="Cart" />
        <div className={styles.userProfile}>
          <img src="path/to/user-icon.png" alt="User Profile" />
        </div>
      </div>
    </div>
  );
};

export default Header;