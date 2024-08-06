import React, { useState } from 'react';
import styles from './chat.module.css';

const Sidebar = ({chats, onSelectChat, recentChats, selectedChatId }) => {
  

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>My Chatbots</div>
      <div className={styles.sidebarList}>
          {chats.map((chat) => (
              <div className={`${styles.sidebarElement} ${selectedChatId === chat.id ? styles.selected : ''}`} key={chat.id} onClick={() => onSelectChat(chat.id)}>
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
      <div className={styles.sidebarList}>
        {recentChats.map((chat) => (
          <p className={styles.sidebarElement} key={chat.id} onClick={() => onSelectChat(chat.id)}>
            <img src = "image/chatRecent.png"
                    alt = ""
                    className= {styles.RecentChatLogo}>
            </img>
            <div className= {styles.sidebarElementName}>
             {chat.messages[chat.messages.length-2].text}
             </div>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;