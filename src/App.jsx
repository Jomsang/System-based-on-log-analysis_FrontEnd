import React, { useState } from 'react';
import LoginScreen from './views/login/index';
import ChatScreen from './views/chatScreen/index';
import { getMessage } from './apis/axiosConfig';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  

  const handleLogin = async (user) => {
    setLoggedIn(true);
    setUsername(user);
    await getMessage();
  };

 //주석테스트2
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