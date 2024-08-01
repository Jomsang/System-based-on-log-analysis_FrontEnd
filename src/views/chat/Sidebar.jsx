import React, { useState } from 'react';
import styles from './chat.module.css';

const Sidebar = ({chats, onSelectChat }) => {
  

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>My Chatbots</div>
      <div className={styles.sidebarList}>
          {chats.map((chat) => (
              <p className={styles.sidebarElement} key={chat.id} onClick={() => onSelectChat(chat.id)}>
                  {chat.name}
              </p>
          ))}
      </div>
      <hr className={styles.sidebarHr}></hr>
      <div className={styles.sidebarTitle}>Recent Chats</div>
    </div>
  );
};

export default Sidebar;