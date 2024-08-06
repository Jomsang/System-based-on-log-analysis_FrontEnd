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

    const [recentChats, setRecentChats] = useState([]);

    const [activeChat, setActiveChat] = useState(null);
    
    const addChatRoom = () => {
        const newChatId = chats.length + 1;
        const newChat = {
            id: newChatId,
            name: `Chat ${newChatId}`,
            messages: [{ text: 'What can I do for you' + newChatId, isUser: false }],
        };
        setChats([...chats, newChat]);
        setMessages(newChat.messages);
        setActiveChat(newChatId);
        console.log(chats);
    };


    const handleSendMessage = (message) => {
        // 현재 타이핑 중인 메시지가 있는지 확인
        const isTypingExists = messages.some(msg => msg.isTyping);
        if (activeChat != null && !isTypingExists) {
            // 새로운 메시지 생성
            const newUserMessage = { text: message, isUser: true };
            const newAIResponse = {
                text: `Your message is: "${message}"`,
                isUser: false,
                isTyping: true,
                id: Date.now()
            };
    
            // chats 상태 업데이트
            setChats((prevChats) => {
                const updatedChats = prevChats.map((chat) => {
                    if (chat.id === activeChat) {
                        return {
                            ...chat,
                            messages: [...chat.messages, newUserMessage, newAIResponse]
                        };
                    }
                    return chat;
                });
                
                // 현재 채팅 찾기
                const currentChat = updatedChats.find(chat => chat.id === activeChat);
    
                // 최근 채팅 업데이트
                setRecentChats((prevRecentChats) => {
                    //const updatedRecentChats = prevRecentChats.filter(chat => chat.id !== activeChat);
                    return [currentChat, ...recentChats].slice(0, 5); // 최근 5개만 유지
                });
                console.log(recentChats)
                return updatedChats;
            });
    
            // messages 상태 업데이트
            setMessages((prevMessages) => [
                ...prevMessages,
                newUserMessage,
                newAIResponse
            ]);

        }else if (isTypingExists) {
            // 타이핑 중이면 경고 메시지 출력 (예시)
            alert("Please wait until the current message is finished typing.");
        }
    };

    const handleSelectChat = (chatId) => {
        const selectedChat = chats.find((chat) => chat.id === chatId);

        if (selectedChat) {

            // 메시지 상태에서 isTyping 속성 업데이트
            const updatedMessages = selectedChat.messages.map((msg) => ({
                ...msg,
                isTyping: msg.isTyping ? false : msg.isTyping
            }));
            setMessages(updatedMessages);
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
                <Sidebar chats={chats} onSelectChat={handleSelectChat} recentChats = {recentChats}/>
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
                <Typing speed={200} onFinishedTyping={() => onEndTyping(id)}>
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
