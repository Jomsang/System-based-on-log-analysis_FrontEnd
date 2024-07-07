import React, { useState } from 'react';
import LoginScreen from './views/login/index';
import ChatScreen from './views/chatScreen/index';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [alertFlag, setAlertFlag] = useState(false);

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUsername(user);
    setAlertFlag(true);
  };
// 1.alert 상태값 이용해서 로그인 성공or실패 뜨게하고 채팅창 넘어가게 하는거 생각해보기
// 2.alert까지 하고 github에 push 작업 하기.
  return (
    <div className="app">
      {!loggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <ChatScreen username={username} />
      )}

      {alertFlag ? (        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          로그인에 성공하셨습니다.!
        </Alert>):(<></>)}
    </div>
  );
};

export default App;