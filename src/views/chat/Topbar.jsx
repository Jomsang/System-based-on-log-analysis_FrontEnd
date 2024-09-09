import React, { useState } from 'react';
import styles from './chat.module.css';
import { useNavigate } from 'react-router-dom';

const Topbar = ({onAddChatRoom}) => {
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.topbar}>
          <div className={styles.topbarWrapper}>
              <div className={styles.topLeft}>
                <img src = "image/chatLogo.png"
                    alt = ""
                    className= {styles.logoImg}>
                </img>
                <span className={styles.logo} onClick={goToBack}>Chatbot Builder</span>
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