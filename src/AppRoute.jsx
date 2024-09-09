import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import PublicRoute from "views/common/PublicRoute";
import Login from "views/login";
import SignUp from "views/signUp";
import Layout from "views/common/Layout";
import ModelList from "views/modelList/modelList";
import ModelDetail from "views/modelDetail/modelDetail";
import Error from "views/common/Error";
import Chat from "views/chat";
import Main from "views/main";
import React, { useState, useEffect } from "react";

const AppRoute = (props) => {
  const getInitialLogInState = () => {
    let savedState = localStorage.getItem("logOn");
    if (savedState === null) {
      localStorage.setItem("logOn", JSON.stringify(false));
      savedState = "false";
    }
    console.log('savedState? ', savedState);
    return JSON.parse(savedState);
  };

  const [logOn, setLogon] = useState(getInitialLogInState());
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    setLogon(true);
    localStorage.setItem("userId", user);
    navigate("/mainLogIn");
  };

  const handleLogout = async () => {
    setLogon(false);
    localStorage.setItem("logOn", false);
    localStorage.removeItem("userId");
    navigate("/mainLogOut");
  };

  useEffect(() =>{
    console.log("AppRoute storage logOn?", localStorage.getItem("logOn"));
    console.log("AppRoute status logOn?", logOn);
  });

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
              <Layout onLogOut={handleLogout} logOn={logOn}>
                <Routes>
                  <Route path="/mainLogIn" element={<Main />} />
                  <Route path="/error" element={<Error />} />
                  <Route path="/modelList" element={<ModelList />} />
                  <Route path="/modelDetail" element={<ModelDetail />} />

                  {/* 로그인 상태에서 라우팅으로 지정되지 않은 url 입력 시 error페이지 리다이렉트 */}
                  <Route path="*" element={<Navigate to="/mainLogIn" />} />
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
                restricted={false}
                element={<Login onLogin={handleLogin} />}
              />
            }
          />
          <Route path="/mainLogOut" 
          element={
            <Layout logOn={logOn}>
              <PublicRoute
                  logOn={logOn}
                  restricted={true}
                  element={<Main />}
                />
            </Layout>
          } />
          {/* 비로그인 상태에서 라우팅으로 지정되지 않은 url 입력 시 /login 리다이렉트 */}
          <Route path="*" element={<Navigate to="/mainLogOut" />} />
        </Routes>
      )}
    </>
  );
};

export default AppRoute;
