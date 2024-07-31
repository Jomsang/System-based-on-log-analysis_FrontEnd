import React, { useState } from 'react';
import LoginScreen from './views/login/index';
import ChatScreen from './views/chatScreen/index';
import ModelList from './views/modelList/modelList';

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
        <ModelList username={username} />
      ) : (
        <ChatScreen username={username} />
      )}
    </div>
  );
};

export default App;