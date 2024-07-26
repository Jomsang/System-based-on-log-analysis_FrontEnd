import {  Router, Route, Routes, useNavigate, Navigate  } from "react-router-dom";
// import PrivateRoute from 'views/common/PrivateRoute';
import PublicRoute from 'views/common/PublicRoute';
import Login from "views/login";
import SignUp from "views/signUp";
import Layout from 'views/common/Layout';
import ChatScreen from 'views/chatScreen';
import Error from 'views/common/Error';
import React, { useState, useEffect } from 'react';

const AppRoute = (props) => {
    
    const getInitialLogInState = () => {
      const savedState = localStorage.getItem('logOn');
      return savedState === null ? false : JSON.parse(savedState);
    };

    const [logOn, setLogon] = useState(getInitialLogInState);
    const navigate = useNavigate();

    const handleLogin = async (user) => {
        setLogon(true);
        navigate('/chat');
    };

    const handleLogout = async () => {
      setLogon(false);
      navigate('/');
  };


  useEffect(() => {
    // 상태값 출력
    localStorage.setItem('logOn', JSON.stringify(logOn));
    console.log('logOn: ', logOn);
  }, [logOn]);


  return (
   <>
        {/* 임시로 상태값 localsStorage사용. 추후에는 세션 정보로 해야 함. */}
        {logOn ?
          //로그인 성공 시 사용 가능한 화면들
          <Routes>
            <Route
              path="*" 
              element={
                <Layout onLogOut={handleLogout}>
                  <Routes>
                    <Route path="/chat" element={<ChatScreen />} />
                    <Route path="/error" element={<Error />} />

                    {/* 로그인 상태에서 라우팅으로 지정되지 않은 url 입력 시 error페이지 리다이렉트 */}
                    <Route path="*" element={<Navigate to="/error" />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
            :
          //비로그인 시 화면(로그인, 회원가입)
          <Routes>
            <Route path="/signUp" element={<PublicRoute logOn={logOn} restricted={false} element={<SignUp />} />} />
              <Route path="/login" element={<PublicRoute logOn={logOn} restricted={true} element={<Login onLogin={handleLogin} />} />} />
              {/* 비로그인 상태에서 라우팅으로 지정되지 않은 url 입력 시 /login 리다이렉트 */}
              <Route path="*" element={<Navigate to="/login" />} />
          </Routes>    
            
        }

   </>
  );


}


export default AppRoute;