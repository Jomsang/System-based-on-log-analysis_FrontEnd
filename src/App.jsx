import React, { useState } from 'react';
import LoginScreen from './views/login/index';
import ChatScreen from './views/chatScreen/index';
import Header from './views/common/Header';
import { getMessage } from './apis/aiApi';
import AppRoute from 'AppRoute';

const App = (props) => {

  return (
    // <div className="app">
    //   <Header />
    //   {!loggedIn ? (
    //     <LoginScreen onLogin={handleLogin} />
    //   ) : (
    //     <ChatScreen username={username} />
    //   )}
    // </div>
    <AppRoute/>
  );
};

export default App;