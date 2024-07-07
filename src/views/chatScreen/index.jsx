import React, { useState } from 'react';

const ChatScreen = ({ username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    // 메시지 추가 (여기서는 간단하게 배열에 추가)
    setMessages([...messages, { author: username, content: message }]);
    setMessage('');
  };

  return (
    <div className="chat-screen">
      <h2>채팅</h2>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={msg.author === username ? 'my-message' : 'other-message'}>
            <strong>{msg.author}: </strong>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="메시지 입력..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>전송</button>
    </div>
  );
};

export default ChatScreen;