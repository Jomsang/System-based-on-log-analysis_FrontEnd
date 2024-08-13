import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./components/Banner";
import Category from "./components/Category";
import BestSelection from "./components/BestSelection";
import styles from "./Main.module.css"; // 스타일 파일 임포트

const Main = () => {
  const navigate = useNavigate();

  const handleChatBotClick = () => {
    navigate("/chat"); // 챗봇 페이지로 이동
  };

  return (
    <div>
      <Banner />
      <Category />
      <BestSelection />

      {/* 우측 하단에 고정된 챗봇 로고 */}
      <div className={styles.chatBotIcon} onClick={handleChatBotClick}>
        <img src="/image/chatBotLogo.png" alt="Chat Bot" />
      </div>
    </div>
  );
};

export default Main;
