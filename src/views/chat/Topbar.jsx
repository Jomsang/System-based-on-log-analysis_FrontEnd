import React, { useState } from 'react';
import styles from './chat.module.css';


const Topbar = ({onAddChatRoom}) => {
  

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
              <div className={styles.topRight}>
                <button className={styles.addChatRoom} onClick={onAddChatRoom}>+ Create Chatbot</button>
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