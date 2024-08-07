import React, { useState, useEffect } from "react";
import Typing from "react-typing-animation";
import styles from "./chat.module.css"; // CSS 임포트
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

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
            messages: []
        };
        setChats([...chats, newChat]);
        setMessages(newChat.messages);
        setSelectedChatId(newChatId);
        setActiveChat(newChatId);
    };

    const handleSendMessage = (message, isImage = false) => {
        const isTypingExists = messages.some((msg) => msg.isTyping);
        if (activeChat != null && !isTypingExists) {
            const newUserMessage = { text: message, isUser: true, isImage };
            const newAIResponse = {
                text: `Your message is: "${message}"`,
                isUser: false,
                isTyping: true,
                id: Date.now()
            };

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

                const currentChat = updatedChats.find((chat) => chat.id === activeChat);

                setRecentChats((prevRecentChats) => {
                    const updatedRecentChats = [currentChat, ...prevRecentChats.filter((chat) => chat.id !== activeChat)];
                    return updatedRecentChats.slice(0, 5);
                });

                return updatedChats;
            });

            setMessages((prevMessages) => [
                ...prevMessages,
                newUserMessage,
                newAIResponse
            ]);
        } else if (activeChat != null && isTypingExists) {
            alert("Please wait until the current message is finished typing.");
            return;
        } else if (activeChat == null && !isTypingExists) {
            const newChatId = chats.length + 1;
            const newChat = {
                id: newChatId,
                name: `Chat ${newChatId}`,
                messages: []
            };
            setChats([...chats, newChat]);

            const newUserMessage = { text: message, isUser: true, isImage };
            const newAIResponse = {
                text: `Your message is: "${message}"`,
                isUser: false,
                isTyping: true,
                id: Date.now()
            };

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

                const currentChat = updatedChats.find((chat) => chat.id === newChatId);

                setRecentChats((prevRecentChats) => {
                    const updatedRecentChats = [currentChat, ...prevRecentChats.filter((chat) => chat.id !== newChatId)];
                    return updatedRecentChats.slice(0, 5);
                });

                return updatedChats;
            });

            setMessages((prevMessages) => [
                ...prevMessages,
                newUserMessage,
                newAIResponse
            ]);

            setSelectedChatId(newChatId);
            setActiveChat(newChatId);
        }
    };

    const handleSelectChat = (chatId) => {
        const isTypingExists = messages.some(msg => msg.isTyping);
        console.log(chatId);
        if (isTypingExists) {
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

    const handleDeleteChat = (chatId) => {
        setChats((prevChats) => prevChats.filter(chat => chat.id !== chatId));
        setRecentChats((prevRecentChats) => prevRecentChats.filter(chat => chat.id !== chatId));
        
        if (activeChat === chatId) {
            setActiveChat(null);
            setSelectedChatId(null);
            setMessages([]);
        }

        console.log('***' + messages);
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
      <div className={styles.app}>
            <div><Topbar onAddChatRoom={addChatRoom} /></div>
            <div className={styles.chatContaner}>
                <Sidebar chats={chats} onSelectChat={handleSelectChat} onDeleteChat={handleDeleteChat} recentChats={recentChats} selectedChatId={selectedChatId} />
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
                            <img src="image/mainChatLogo.png" alt="" className={styles.MainChatLogo}></img>
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
    isImage,
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
                isImage ? (
                    <div>
                        <b>{isUser ? "User" : "AI"}</b>:
                        <img src={text} alt="user upload" className={styles.messageImage} />
                    </div>
                ) : (
                    <p>
                        <b>{isUser ? "User" : "AI"}</b>: {text}
                    </p>
                )
            )}
        </div>
    );
};

const MessageForm = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message) {
            onSendMessage(message);
        }
        if (image) {
            onSendMessage(image, true);
        }
        setMessage("");
        setImage(null);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.messageForm} onDragOver={handleDragOver} onDrop={handleDrop}>
            <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={styles.messageInput}
                placeholder="Type a message or drag & drop an image"
            />
            <button type="submit" className={styles.sendButton}>
                <img src="image/chatSend.png" height="40px" width="40px" alt="Send" />
            </button>
        </form>
    );
};

export default Chat;