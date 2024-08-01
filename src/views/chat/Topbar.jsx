import React, { useState } from 'react';
import styles from './chat.module.css';


const Topbar = () => {
  

  return (
    <div className={styles.topbar}>
          <div className={styles.topbarWrapper}>
              <div className={styles.topLeft}>
              <img src = "image/chatLogo.png"
                    alt = ""
                    className= {styles.logoImg}>
                </img>
                <span className={styles.logo}>Chatbot Builder</span>
                </div>
              <div className={styles.topRight}>createChatbot
                <div className={styles.topbarIconContainer}></div>
                <img src = "image/chatAvatar.png"
                    alt = ""
                    className= {styles.topAvartar}>
                </img>

              </div>
          </div>
    </div>
  );
};

export default Topbar;