import React, { useState } from 'react';
import LoginScreen from './views/login/index';
import ChatScreen from './views/chatScreen/index';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUsername(user);
    
  };
// 1.alert 상태값 이용해서 로그인 성공or실패 뜨게하고 채팅창 넘어가게 하는거 생각해보기
  return (
    <div className="app">
      {!loggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <ChatScreen username={username} />
      )}
    </div>
  );
};

export default App;