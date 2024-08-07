import React, { useState } from 'react';
import styles from './chat.module.css';

const Sidebar = ({chats, onSelectChat, onDeleteChat, recentChats, selectedChatId }) => {
  
  const [view, setView] = useState(false);

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
                  <ul className={styles.chatDropdown} onClick={() => {setView(!view)}} >
                    <img src = "image/chatDropDown.png"
                      alt = ""
                      className= {styles.chatDropDownLogo}>
                    </img>
                    {view && <Dropdown onDeleteChat = {onDeleteChat} chatId = {chat.id}/>}
                  </ul>
                  
                  
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

const Dropdown = ({onDeleteChat, chatId}) => {

  return (
    <>
    <li onClick={() => onDeleteChat(chatId)}>삭제</li>
    </>
  );
}


export default Sidebar;