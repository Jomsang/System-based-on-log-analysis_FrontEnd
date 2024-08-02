import React, { useState, useEffect } from "react";
import Typing from "react-typing-animation";
import styles from "./chat.module.css"; // CSS 임포트
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { Container } from "@mui/material";

const Chat = () => {

    const [chats, setChats] = useState([
        { id: 1, name: 'Chat 1', messages: [{ text: 'Hello', isUser: false }] },
        { id: 2, name: 'Chat 2', messages: [{ text: 'Hi', isUser: false }] },
        { id: 3, name: 'Chat 3', messages: [{ text: 'HiHiHi', isUser: false }] },
      ]);

    const [currentTypingId, setCurrentTypingId] = useState(null);

    const [messages, setMessages] = useState([]);

    const [activeChat, setActiveChat] = useState(null);
    
    const addChatRoom = () => {
        const newChatId = chats.length + 1;
        const newChat = {
            id: newChatId,
            name: `Chat ${newChatId}`,
            messages: [],
        };
        setChats([...chats, newChat]);
        console.log(chats);
    };


    const handleSendMessage = (message) => {
        if (activeChat != null) {
            setChats((prevChats) => {
                return prevChats.map((chat) => {
                    if (chat.id === activeChat) {
                        return {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                { text: message, isUser: true },
                                {
                                    text: `Your message is: "${message}"`,
                                    isUser: false,
                                    isTyping: true,
                                    id: Date.now()
                                }
                            ]
                        };
                    }
                    return chat;
                });
            });
        }
    };

    const handleSelectChat = (chatId) => {
        const selectedChat = chats.find((chat) => chat.id === chatId);
        if (selectedChat) {
            setMessages(selectedChat.messages);
            setActiveChat(chatId);
        }
    };

    const handleEndTyping = (id) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.id === id ? { ...msg, isTyping: false } : msg
            )
        );
        setCurrentTypingId(null);
    };

    useEffect(() => {
        if (currentTypingId === null) {
            const nextTypingMessage = messages.find(
                (msg) => !msg.isUser && msg.isTyping
            );
            if (nextTypingMessage) {
                setCurrentTypingId(nextTypingMessage.id);
            }
        }
    }, [messages, currentTypingId]);

    return (
      <div className ={styles.app}>
            <div><Topbar onAddChatRoom={addChatRoom}/></div>
            <div className ={styles.chatContaner}>
                <Sidebar chats={chats} onSelectChat={handleSelectChat}/>
                <div className={styles.chatBox}>
                    <MessageList
                        messages={messages}
                        currentTypingId={currentTypingId}
                        onEndTyping={handleEndTyping}
                    />
                    <MessageForm onSendMessage={handleSendMessage} />
                </div>
            </div>
      </div>
    );
};

const MessageList = ({ messages, currentTypingId, onEndTyping }) => (
    <div className={styles.messagesList}>
        {messages.map((message, index) => (
            <Message
                key={index}
                {...message}
                onEndTyping={onEndTyping}
                currentTypingId={currentTypingId}
            />
        ))}
    </div>
);

const Message = ({
    text,
    isUser,
    isTyping,
    id,
    onEndTyping,
    currentTypingId
}) => {
    return (
        <div className={isUser ? styles.userMessage : styles.aiMessage}>
            {isTyping && currentTypingId === id ? (
                <Typing speed={50} onFinishedTyping={() => onEndTyping(id)}>
                    <p>
                        <b>AI</b>: {text}
                    </p>
                </Typing>
            ) : (
                <p>
                    <b>{isUser ? "User" : "AI"}</b>: {text}
                </p>
            )}
        </div>
    );
};

const MessageForm = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSendMessage(message);
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.messageForm}>
            <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={styles.messageInput}
            />
            <button type="submit" className={styles.sendButton}>
                <img src = "image/chatSend.png" height="40px" width="40px"/>
                
            </button>
        </form>
    );
};



export default Chat;
