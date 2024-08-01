import React from 'react';
import styles from 'views/common/Footer.module.css';


const Footer = () => {
  return (
    <footer>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomLeft}>
          <select>
            <option value="en">English</option>
            <option value="ko">한국어</option>
            {/* 다른 언어 옵션 추가 가능 */}
          </select>
        </div>
        <div>
          <span>© 2022 Brand, Inc. • Privacy • Terms • Sitemap</span>
        </div>
        <div className={styles.footerBottomRight}>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


