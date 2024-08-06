import React, { useState, useEffect } from "react";
import Typing from "react-typing-animation";
import styles from "./chat.module.css"; // CSS 임포트
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import { Container } from "@mui/material";

const Chat = () => {
    
    const [chats, setChats] = useState([
        { id: 1, name: 'Chat 1', messages: [{text: 'hihi', isUser: true}, {text: 'Your message is: "ddd"', isUser: false, isTyping: false, id: 1722958320710}] },
        { id: 2, name: 'Chat 2', messages: [{ text: 'Hi', isUser: true }, {text: 'Your message is: "ddd"', isUser: false, isTyping: false, id: 1722958320710}] },
        { id: 3, name: 'Chat 3', messages: [{ text: 'HiHiHi', isUser: true }, {text: 'Your message is: "ddd"', isUser: false, isTyping: false, id: 1722958320710}] },
      ]);

    const [currentTypingId, setCurrentTypingId] = useState(null);

    const [messages, setMessages] = useState([]);

    const [recentChats, setRecentChats] = useState([]);

    const [activeChat, setActiveChat] = useState(null);

    const [selectedChatId, setSelectedChatId] = useState(null);

    const addChatRoom = () => {
        const newChatId = chats.length + 1;
        const newChat = {
            id: newChatId,
            name: `Chat ${newChatId}`,
            messages: []//[{ text: 'What can I do for you' + newChatId, isUser: false }],
        };
        setChats([...chats, newChat]);
        setMessages(newChat.messages);
        setSelectedChatId(newChatId);
        setActiveChat(newChatId);
        
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

                const currentChat = updatedChats.find(chat => chat.id === activeChat);

                setRecentChats((prevRecentChats) => {
                    const updatedRecentChats = [currentChat, ...prevRecentChats.filter(chat => chat.id !== activeChat)];
                    return updatedRecentChats.slice(0, 5);
                });

                return updatedChats;
            });

            // messages 상태 업데이트
            setMessages((prevMessages) => [
                ...prevMessages,
                newUserMessage,
                newAIResponse
            ]);
    
            
    
        } else if (activeChat != null && isTypingExists) {
            // 타이핑 중이면 경고 메시지 출력 (예시)
            alert("Please wait until the current message is finished typing.");
            return;
    
        } else if (activeChat == null && !isTypingExists) {
            // 채팅방형성
            const newChatId = chats.length + 1;
            const newChat = {
                id: newChatId,
                name: `Chat ${newChatId}`,
                messages: [] // [{ text: 'What can I do for you' + newChatId, isUser: false }],
            };
            setChats([...chats, newChat]);
            
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
                    if (chat.id === newChatId) {
                        return {
                            ...chat,
                            messages: [...chat.messages, newUserMessage, newAIResponse]
                        };
                    }
                    return chat;
                });
    
                const currentChat = updatedChats.find(chat => chat.id === newChatId);

                setRecentChats((prevRecentChats) => {
                    const updatedRecentChats = [currentChat, ...prevRecentChats.filter(chat => chat.id !== newChatId)];
                    return updatedRecentChats.slice(0, 5);
                });

                return updatedChats;
            });

             // messages 상태 업데이트
             setMessages((prevMessages) => [
                ...prevMessages,
                newUserMessage,
                newAIResponse
            ]);

            // 새로운 채팅방을 활성 채팅방으로 설정
            setSelectedChatId(newChatId);
            setActiveChat(newChatId);
        }
    };

    const handleSelectChat = (chatId) => {

        const isTypingExists = messages.some(msg => msg.isTyping);

        if (isTypingExists) {
            // 타이핑 중이면 경고 메시지 출력 (예시)
            alert("Please wait until the current message is finished typing.");
            return;
    
        } 
        const selectedChat = chats.find((chat) => chat.id === chatId);
        setSelectedChatId(chatId);

        if (selectedChat) {
            setMessages(selectedChat.messages);
            setActiveChat(chatId);
            console.log(chats);
            console.log(messages);
        }
    };

    const handleEndTyping = (id) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.id === id ? { ...msg, isTyping: false } : msg
            )
        );
        
        setChats((prevChats) =>
            prevChats.map((chat) => {
                if (chat.id === activeChat) {
                    const updatedMessages = chat.messages.map((msg) =>
                        msg.id === id ? { ...msg, isTyping: false } : msg
                    );
                    return { ...chat, messages: updatedMessages };
                }
                return chat;
            })
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
                <Sidebar chats={chats} onSelectChat={handleSelectChat} recentChats = {recentChats} selectedChatId = {selectedChatId}/>
                <div className={styles.chatBox}>
                    {messages.length > 0 ? (
                            <>
                                <MessageList
                                    messages={messages}
                                    currentTypingId={currentTypingId}
                                    onEndTyping={handleEndTyping}
                                />
                            </>
                        ) : (
                            <div className={styles.WelcomeContainer}>
                                <img src = "image/mainChatLogo.png"
                                     alt = ""
                                     className= {styles.MainChatLogo}>
                                </img>

                                <div className={styles.WelcomeTitle}>
                                    <b>HelpWise</b>
                                    <p>I'm Your customer support, ready to answser<br></br>your questions</p>
                                </div>

                                <div className={styles.WelcomeMessage}>
                                Welcome! Please select a chat room or start a new chat?
                                </div>
                                <div className={styles.WelcomeMessage}>
                                Welcome! Please select a chat room or start a new chat?
                                </div>
                                <div className={styles.WelcomeMessage}>
                                Welcome! Please select a chat room or start a new chat?
                                </div>
                            </div>
                            

                        )}
                        <>
                        <MessageForm onSendMessage={handleSendMessage} />
                        </>
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
                <Typing speed={5} onFinishedTyping={() => onEndTyping(id)}>
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
