import {  Router, Route, Routes, useNavigate, Navigate  } from "react-router-dom";
// import PrivateRoute from 'views/common/PrivateRoute';
import PublicRoute from 'views/common/PublicRoute';
import Login from "views/login";
import Layout from 'views/common/Layout';
import ChatScreen from 'views/chatScreen';
import React, { useState, useEffect } from 'react';


//로그인 및 회원가입, 챗봇 화면 제외 헤더, 푸터 상시 표시 
const AppRoute = (props) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    // const [log, setLogon] = useState(false);
    const [logOn, setLogon] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (user) => {
        setLogon(true);
        setUserId(user);
        navigate('/chat');
        // await getMessage();
      };

  return (
   <>
 
        {logOn ?
            //로그인 성공 시 사용 가능한 화면들
            <Routes>
            <Route
              path="*" 
              element={
                <Layout>
                  <Routes>
                   <Route path="/chat" element={<ChatScreen />} />
      
                  </Routes>
                </Layout>
              }
            />
          </Routes>
            :
            //비로그인 시 화면(로그인, 회원가입)
          <Routes>
              <Route path="/login" element={<PublicRoute logOn={logOn} restricted={true} element={<Login onLogin={handleLogin} />} />} />
              {/* 비로그인 상태에서 라우팅으로 지정되지 않은 url 입력 시 /login 리다이렉트 */}
              <Route path="*" element={<Navigate to="/login" />} />
          </Routes>    
            
        }

   </>
  );


}


export default AppRoute;