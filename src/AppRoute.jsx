import { Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
// import PrivateRoute from 'views/common/PrivateRoute';
import PublicRoute from "views/common/PublicRoute";
import Login from "views/login";
import SignUp from "views/signUp";
import Layout from "views/common/Layout";
// import ChatScreen from 'views/chatScreen';
import ModelList from "views/modelList/modelList";
import Error from "views/common/Error";
import Chat from "views/chat";
import React, { useState, useEffect } from "react";
// import main from "views/main";
import Main from "views/main";

const AppRoute = (props) => {
  const getInitialLogInState = () => {
    const savedState = localStorage.getItem("logOn");
    return savedState === null ? false : JSON.parse(savedState);
  };

  const [logOn, setLogon] = useState(getInitialLogInState);
  const showChat = false; // ChatScreen 컴포넌트를 보여줄지 결정하는 상태 변수
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    setLogon(true);
    navigate("/chat");
  };

  const handleLogout = async () => {
    setLogon(false);
    navigate("/");
  };

  useEffect(() => {
    // 상태값 출력
    localStorage.setItem("logOn", JSON.stringify(logOn));
    console.log("logOn: ", logOn);
  }, [logOn]);

  return (
    <>
      {/* 임시로 상태값 localsStorage사용. 추후에는 세션 정보로 해야 함. */}
      {logOn ? (
        //로그인 성공 시 사용 가능한 화면들
        <Routes>
          {/* 채팅 창은 헤더, 푸터 안 나타나게 처리 */}
          <Route path="/chat" element={<Chat />} />
          <Route
            path="*"
            element={
              <Layout onLogOut={handleLogout}>
                <Routes>
                  <Route path="/main" element={<Main />} />
                  <Route path="/error" element={<Error />} />
                  <Route path="/modelList" element={<ModelList />} />

                  {/* 로그인 상태에서 라우팅으로 지정되지 않은 url 입력 시 error페이지 리다이렉트 */}
                  <Route path="*" element={<Navigate to="/error" />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      ) : (
        //비로그인 시 화면(로그인, 회원가입)
        <Routes>
          <Route
            path="/signUp"
            element={
              <PublicRoute
                logOn={logOn}
                restricted={false}
                element={<SignUp />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute
                logOn={logOn}
                restricted={true}
                element={<Login onLogin={handleLogin} />}
              />
            }
          />
          {/* 비로그인 상태에서 라우팅으로 지정되지 않은 url 입력 시 /login 리다이렉트 */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoute;
