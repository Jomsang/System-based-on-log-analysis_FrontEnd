import React, { useState } from "react";
import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";

const Header = ({ onLogOut, logOn}) => {
  const [searchKeyword, setSearchKeyWord] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    navigate('/login');
  };

  const handleMain = (flag) => {
    if(flag){
      navigate('/mainLogIn');
    } else {
      navigate('/mainLogOut');
    }
  };

  const handleSearchOfHeader = async (event) => {
    if (event.key === 'Enter') {
      if(logOn){
        navigate(`/modelListLogIn?searchKeyword=${searchKeyword}`);
      } else {
        navigate(`/modelListLogOut?searchKeyword=${searchKeyword}`);
      }
      setSearchKeyWord('');
    }
  }

  return (
    <header className={styles.container}>
    <div className={styles.logo}>
      {logOn? 
        <>
          <span onClick={() => handleMain(true)} style={{ cursor: 'pointer' }}>Shopping</span>
        </>
        : 
        <>
          <span onClick={() => handleMain(false)} style={{ cursor: 'pointer' }}>Shopping</span>
        </>
        }
    </div>
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search" className={styles.searchInput} value={searchKeyword}  onChange={(e) => setSearchKeyWord(e.target.value)} onKeyDown={handleSearchOfHeader}/>
      <button className={styles.searchButton}>
        <img src="/image/search.JPG" alt="Search" />
      </button>
      <button className={styles.cameraButton}>
        <img src="/image/camera.JPG" alt="Search" />
      </button>
    </div>
    <div className={styles.icons}>
      <img src="/image/bucket.JPG" alt="Cart" />
      <div className={styles.userProfile} >
        {logOn? 
        <>
          <img className={styles.logProfile} src="/image/logout.png" alt="logout" onClick={onLogOut}/>
          <img src="/image/user.JPG" alt="User Profile" />
        </>
        : 
        <>
          <img className={styles.logProfile} src="/image/login.png" alt="login" onClick={handleLogin}/>
          <img src="/image/emptyUser.JPG" alt="User Profile" />
        </>
        }
      </div>
    </div>

    </header>
  );
};

export default Header;