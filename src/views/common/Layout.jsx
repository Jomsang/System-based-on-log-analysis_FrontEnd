import styles from 'views/common/Layout.module.css'; // CSS 모듈 임포트
import Header from 'views/common/Header';
import Footer from 'views/common/Footer';
import React from "react";
const Layout = ({ children, onLogOut, logOn}) => {


  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Header onLogOut={onLogOut}  logOn={logOn}/>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
