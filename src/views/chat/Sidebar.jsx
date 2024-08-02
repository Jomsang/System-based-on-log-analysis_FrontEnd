import React, { useState } from 'react';
import styles from './chat.module.css';

const Sidebar = ({chats, onSelectChat }) => {
  

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>My Chatbots</div>
      <div className={styles.sidebarList}>
          {chats.map((chat) => (
              <div className={styles.sidebarElement} key={chat.id} onClick={() => onSelectChat(chat.id)}>
                  <img src = "image/chatAvatar.png"
                    alt = ""
                    className= {styles.ChatRoomAvartar}>
                  </img>
                  <div className= {styles.sidebarElementName}>{chat.name}</div>
              </div>
          ))}
      </div>
      <hr className={styles.sidebarHr}></hr>
      <div className={styles.sidebarTitle}>Recent Chats</div>
    </div>
  );
};

export default Sidebar;