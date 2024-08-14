import React, { useState } from 'react';
import styles from './chat.module.css';

const Sidebar = ({chats, onSelectChat, onDeleteChat, recentChats, selectedChatId }) => {
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>My Chatbots</div>
      <div className={styles.sidebarList}>
          {chats.map((chat) => (
              <div className={`${styles.sidebarElement} ${selectedChatId === chat.chatId ? styles.selected : ''}`} key={chat.chatId} >
                  <img src = "image/chatAvatar.png"
                    alt = ""
                    className= {styles.ChatRoomAvartar}>
                  </img>
                  <div className= {styles.sidebarElementName} onClick={() => onSelectChat(chat.chatId)}>{chat.chatName}</div>
                  <ul className={styles.chatDropdown}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                    <img src = "image/chatDropDown.png"
                      alt = ""
                      className= {styles.chatDropDownLogo}>
                    </img>
                    {dropdownVisible && <Dropdown onDeleteChat = {onDeleteChat} chatId = {chat.chatId}/>}
                  </ul>
                  
                  
              </div>
          ))}
      </div>
      <hr className={styles.sidebarHr}></hr>
      <div className={styles.sidebarTitle}>Recent Chats</div>
      <div className={styles.sidebarList}>
        {recentChats.map((chat) => (
          <p className={styles.sidebarElement} key={chat.chatId} onClick={() => onSelectChat(chat.chatId)}>
            <img src = "image/chatRecent.png"
                    alt = ""
                    className= {styles.RecentChatLogo}>
            </img>
            <div className= {styles.sidebarElementName}>
             {chat.messages[chat.messages.length-2].textMessage}
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
    <li className= {styles.chatDropdownList} onClick={() => onDeleteChat(chatId)}>삭제</li>
    </>
  );
}


export default Sidebar;