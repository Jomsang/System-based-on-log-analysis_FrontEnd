import React, { useState, useEffect } from "react";
import Typing from "react-typing-animation";
import styles from "./chat.module.css"; // CSS 임포트
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import axios from 'axios';
import { selectChat } from 'apis/aiApi';
import { insertChat } from 'apis/aiApi';
import { deletechat } from 'apis/aiApi';
import { getAiMessages } from 'apis/aiApi';

const Chat = () => {
    const [chats, setChats] = useState([
        // { userId: 1234, chatId: 1, chatName: 'Chat 1', messages: [{textMessage: 'hihi11', imgMessage: '',  isUser: true, isImage: false, isTyping: false, message_id: 1722958320710}, {textMessage: 'Your message is: "ddd11"',"imgMessage": "",isUser: false, isImage: false, isTyping: false, message_id: 1722958320710}] },
        // { userId: 1234, chatId: 2, chatName: 'Chat 2', messages: [{textMessage: 'hihi22', imgMessage: '',  isUser: true, isImage: false, isTyping: false, message_id: 1722958320710}, {textMessage: 'Your message is: "ddd22"', "imgMessage": "",isUser: false, isImage: false, isTyping: false, message_id: 1722958320710}] },
        // { userId: 1234, chatId: 3, chatName: 'Chat 3', messages: [{textMessage: 'hihi33', imgMessage: '',  isUser: true, isImage: false, isTyping: false, message_id: 1722958320710}, {textMessage: 'Your message is: "ddd33"', "imgMessage": "",isUser: false, isImage: false, isTyping: false, message_id: 1722958320710}] },
    ]);

    const [currentTypingId, setCurrentTypingId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [recentChats, setRecentChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [tempUserId, setTempUserId] = useState('guest');

    // 초기 채팅방 목록을 가져오는 useEffect
    useEffect(() => {
        // axios.post('http://localhost:8080/chatJpa/selectChat', { userId: '1234' })
        //     .then(response => {
        //         setChats(response.data);
        //         console.log(response.data);
        //     })
        //     .catch(error => console.error('Error fetching chat rooms:', error));

        const fetchData = async (pUserId) => {
            try {
              const res = await selectChat(pUserId);
              setChats(res);
            } catch (error) {
              console.error('Error fetching chat rooms:', error);
            }
          };
          fetchData(localStorage.getItem("userId"));
          setTempUserId(localStorage.getItem("userId"));
    }, []);

    const addChatRoom = () => {
        const newChatId = chats.length + 1;
        const newChat = {
            userId: tempUserId,
            chatId: newChatId,
            chatName: `Chat ${newChatId}`,
            messages: []
        };
        setChats([...chats, newChat]);
        setMessages(newChat.messages);
        setSelectedChatId(newChatId);
        setActiveChat(newChatId);
    };

    // 시간을 YYYYMMDDHHMMSSmmm 형식으로 변환하는 함수
    const getFormattedTime = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0'); // 밀리초는 3자리

        return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    };

    const handleSendMessage = async (textMessage, imgMessage, isImage = false) => {
        console.log("현재 로그인아이디: " + tempUserId);
        const isTypingExists = messages.some((msg) => msg.isTyping);
        if (activeChat != null && !isTypingExists) {
            const newUserMessage = {
                textMessage: textMessage,
                imgMessage: imgMessage,
                isUser: true,
                isImage: isImage,
                isTyping: false,
                messageId: getFormattedTime()
            };
            const newAIResponse = {
                textMessage: `분석중**************`,
                imgMessage: imgMessage,
                isUser: false,
                isImage: false,
                isTyping: true,
                messageId: getFormattedTime()
            };

            // 미리 메시지 업데이트: 새로운 메시지 목록을 만듦
            const updatedChats = chats.map((chat) => {
                if (chat.chatId === activeChat) {
                    return {
                        ...chat,
                        messages: [...chat.messages, newUserMessage, newAIResponse]
                    };
                }
                return chat;
            });
            
            const currentChat = updatedChats.find((chat) => chat.chatId  === activeChat);
            setRecentChats((prevRecentChats) => {
                const updatedRecentChats = [currentChat, ...prevRecentChats.filter((chat) => chat.chatId !== activeChat)];
                return updatedRecentChats.slice(0, 5);
            });
            // setChats와 setMessages로 상태 업데이트
            setChats(updatedChats);
            setMessages([...messages, newUserMessage, newAIResponse]);

            // AI 메시지를 가져오기 위해 서버로 POST 요청
            // const response = await axios.post('http://localhost:8080/chatJpa/getAiMessages', { userMessage: newUserMessage });
            // const aiMessages = response.data; // 서버에서 받은 AI 메시지
            //console.log(aiMessages);
            const res = await getAiMessages(newUserMessage);
            const aiMessages = res;

            // AI 메시지 반영을 위해 메시지 업데이트
            const updatedMessages = updatedChats.map((chat) => {
                if (chat.chatId === activeChat) {
                    return chat.messages.map((msg) => {
                        if (msg.isTyping && !msg.isUser) {
                            return { ...msg, textMessage: aiMessages[0].textMessage, isTyping: false, messageId: getFormattedTime()};
                        }
                        return msg;
                    });
                }
                return []; // 변경된 부분
            }).flat(); // 중첩 배열을 평탄화

            console.log(updatedMessages);
            
            // 타이핑 메시지를 업데이트한 chats로 다시 업데이트
            const finalChats = updatedChats.map((chat) => {
                if (chat.chatId === activeChat) {
                    return { ...chat, messages: updatedMessages };
                }
                return chat;
            });

            console.log('******');
            console.log(finalChats);

            // 상태 업데이트
            setChats(finalChats);
            setMessages(updatedMessages.flat()); // messages 배열도 최신 메시지로 업데이트

            // **채팅방 전체 메시지를 저장하는 API 호출**
            const updatedCurrentChat = finalChats.find((chat) => chat.chatId === activeChat);
            console.log(updatedCurrentChat);
            if (updatedCurrentChat) {
                // await axios.post('http://localhost:8080/chatJpa/insertChatMessages', updatedCurrentChat);
                // console.log('Messages saved successfully.');
                await insertChat(updatedCurrentChat);
            }

        } else if (activeChat != null && isTypingExists) {
            alert("Please wait until the current message is finished typing.");
            return;
        } else if (activeChat == null && !isTypingExists) {
            const newChatId = chats.length + 1;
            const newChat = {
                userId: tempUserId,
                chatId: newChatId,
                chatName: `Chat ${newChatId}`,
                messages: []
            };

            const newUserMessage = {
                textMessage: textMessage,
                imgMessage: imgMessage,
                isUser: true,
                isImage: isImage,
                isTyping: false,
                messageId: getFormattedTime()
            };
            const newAIResponse = {
                textMessage: `분석중**************`,
                imgMessage: imgMessage,
                isUser: false,
                isImage: false,
                isTyping: true,
                messageId: getFormattedTime()
            };

            // 미리 메시지 업데이트: 새로운 메시지 목록을 만듦
            const insertChats = {...newChat, messages: [...messages, newUserMessage, newAIResponse]};
            const updatedChats = [...chats, insertChats];

            const currentChat = updatedChats.find((chat) => chat.chatId  === newChatId);
            setRecentChats((prevRecentChats) => {
                const updatedRecentChats = [currentChat, ...prevRecentChats.filter((chat) => chat.chatId !== newChatId)];
                return updatedRecentChats.slice(0, 5);
            });
            // setChats와 setMessages로 상태 업데이트
            setChats(updatedChats);
            setMessages([...messages, newUserMessage, newAIResponse]);
            setActiveChat(newChatId);
            setSelectedChatId(newChatId);

            
            // AI 메시지를 가져오기 위해 서버로 POST 요청
            // const response = await axios.post('http://localhost:8080/chatJpa/getAiMessages', { userMessage: newUserMessage });
            // const aiMessages = response.data; // 서버에서 받은 AI 메시지
            // console.log(aiMessages);
            const res = await getAiMessages(newUserMessage);

            const aiMessages = res;

            // AI 메시지 반영을 위해 메시지 업데이트
            const updatedMessages = updatedChats.map((chat) => {
                if (chat.chatId === newChatId) {
                    return chat.messages.map((msg) => {
                        if (msg.isTyping && !msg.isUser) {
                            return { ...msg, textMessage: aiMessages[0].textMessage, isTyping: false, messageId: getFormattedTime()};
                        }
                        return msg;
                    });
                }
                return []; // 변경된 부분
            }).flat(); // 중첩 배열을 평탄화
            console.log('******');
            console.log(updatedMessages);

            // 타이핑 메시지를 업데이트한 chats로 다시 업데이트
            const finalChats = updatedChats.map((chat) => {
                if (chat.chatId === newChatId) {
                    return { ...chat, messages: updatedMessages };
                }
                return chat;
            });

            console.log('******');
            console.log(finalChats);

            // 상태 업데이트
            setChats(finalChats);
            setMessages(updatedMessages.flat()); // messages 배열도 최신 메시지로 업데이트
            // **채팅방 전체 메시지를 저장하는 API 호출**
            const updatedCurrentChat = finalChats.find((chat) => chat.chatId === newChatId);
            console.log(updatedCurrentChat);
            if (updatedCurrentChat) {
                // await axios.post('http://localhost:8080/chatJpa/insertChatMessages', updatedCurrentChat);
                // console.log('Messages saved successfully.');
                await insertChat(updatedCurrentChat);
            }
        }
    };

    const handleSelectChat = (chatId) => {
        const isTypingExists = messages.some(msg => msg.isTyping);
        console.log(chatId);
        if (isTypingExists) {
            alert("Please wait until the current message is finished typing.");
            return;
        }

        const selectedChat = chats.find((chat) => chat.chatId === chatId);
        setSelectedChatId(chatId);

        if (selectedChat) {
            setMessages(selectedChat.messages);
            setActiveChat(chatId);
            console.log(chats);
            console.log(messages);
        }
    };

    const handleDeleteChat = (chatId) => {
        //axios.post('http://localhost:8080/chatJpa/deleteChat', { userId: '1234', chatId: chatId })
        deletechat(tempUserId, chatId)
            .then(() => {
                setChats((prevChats) => prevChats.filter(chat => chat.chatId !== chatId));
                setRecentChats((prevRecentChats) => prevRecentChats.filter(chat => chat.chatId !== chatId));
                
                if (activeChat === chatId) {
                    setActiveChat(null);
                    setSelectedChatId(null);
                    setMessages([]);
                }
            })
            .catch(error => console.error('Error deleting chat:', error));
    };

    const handleEndTyping = (id) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.messageId === id ? { ...msg, isTyping: false } : msg
            )
        );

        setChats((prevChats) =>
            prevChats.map((chat) => {
                if (chat.chatId === activeChat) {
                    const updatedMessages = chat.messages.map((msg) =>
                        msg.messageId === id ? { ...msg, isTyping: false } : msg
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
                setCurrentTypingId(nextTypingMessage.messageId);
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

const MessageList = ({ messages, currentTypingId, onEndTyping }) => {return(
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
)};

const Message = ({
    textMessage,
    imgMessage,
    isUser,
    isImage,
    isTyping,
    messageId,
    onEndTyping,
    currentTypingId
}) => {

    const convertTextToLinks = (text) => {
        const urlRegex = /(https?:\/\/[^\s\)]+)/g;
        return text.split(urlRegex).map((part, index) => {
          if (part.match(urlRegex)) {
            return (
              <a key={index} href={part} target="_blank" rel="noopener noreferrer">
                {part}
              </a>
            );
          }
          return part;
        });
      };


    return (
        <div className={isUser ? styles.userMessage : styles.aiMessage}>
            {isTyping && currentTypingId === messageId ? (
                <Typing speed={5} onFinishedTyping={() => onEndTyping(messageId)}>
                    <p>
                        <b>Livart AI</b>: {convertTextToLinks(textMessage)}
                    </p>
                </Typing>
            ) : (
                isImage ? (
                    <div>
                        <div>
                        <b>{isUser ? "User" : "Livart AI"}</b>:
                        {textMessage}
                        </div>
                        <img src={imgMessage} alt="user upload" className={styles.messageImage} />
                        
                    </div>
                ) : (
                    <p>
                        <b>{isUser ? "User" : "Livart AI"}</b>: {convertTextToLinks(textMessage)}
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
        if(message == "" || message == null || image == "" || image == null) {
            alert("Please enter message and image.");
            return;
        }
        if (message && !image) {
            onSendMessage(message, '', false);
        }
        else if (!message && image) {
            onSendMessage('image uploaded', image, true);
        }else{
            onSendMessage(message, image, true);
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
            {image && (
                <div className={styles.imagePreview}>
                    <img src={image} alt="Preview" className={styles.previewImage} />
                    <button type="button" className={styles.removeImageButton} onClick={() => setImage(null)}>
                        X
                    </button>
                </div>
            )}
        </form>
    );
};

export default Chat;