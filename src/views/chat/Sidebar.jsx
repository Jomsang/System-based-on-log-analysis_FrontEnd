import React, { useState } from 'react';
import styles from './chat.module.css';

const Sidebar = ({chats, onSelectChat }) => {
  

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarList}>
          {chats.map((chat) => (
              <p className={styles.sidebarElement} key={chat.id} onClick={() => onSelectChat(chat.id)}>
                  {chat.name}
              </p>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;