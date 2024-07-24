import React from 'react';
import styles from 'views/common/Layout.module.css'; // CSS 모듈 임포트
import Header from 'views/common/Header';
import Footer from 'views/common/Footer';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Header />
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
