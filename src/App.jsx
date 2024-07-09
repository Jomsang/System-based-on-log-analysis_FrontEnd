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
 //주석테스트
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