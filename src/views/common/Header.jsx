import React, {  useEffect, useState } from "react";
import styles from './Header.module.css';
import { Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";


const Header = ({ onLogOut, logOn}) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate('/login');
  };

  useEffect(() => {
    console.log("props? : ",logOn)
  }, []);
  


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
      <div className={styles.userProfile} >
        {logOn? 
          <img className={styles.logProfile} src="/image/logout.png" alt="logout" onClick={onLogOut}/>
        : 
          <img className={styles.logProfile} src="/image/login.png" alt="login" onClick={handleLogin}/>
        }
        <img src="/image/user.JPG" alt="User Profile" />
      </div>
    </div>
    </header>
  );
};

export default Header;