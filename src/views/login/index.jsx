import React, { useState } from 'react';
import {  useNavigate  } from "react-router-dom";
import styles from './Login.module.css';
import {  doLogin } from 'apis/userApi';

const Login = ({onLogin}) => {
const [userId, setUserId] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();
 
  if (userId.trim() === '' || password.trim() === '') {
    alert('사용자 이름과 비밀번호를 입력해주세요.');
    return;
  }

  const successLogin = await doLogin(userId, password);

  if(successLogin === 1){
    localStorage.setItem("logOn", true);
    onLogin(userId);    
  } else {
    alert('ID나 패스워드가 틀렸습니다.');
  }

};

const handleTogglePassword = () => {
  setShowPassword(!showPassword);
};

const handleSginUp = async () => {
  setUserId('');
  setPassword('');
  setShowPassword(false);
  navigate('/signUp');
};

const handleToMain =  () => {
  navigate('/mainLogOut');
};

//테스트api
const testApi = async () => {
  // await getUser();
};

return (
  <div className={styles.container}>
    <div className={styles.logo}>
      <img onClick={handleToMain} src="/image/LIVART.JPG" alt="Logo" style={{ cursor: 'pointer' }}/>
    </div>
    <div className={styles.loginBox}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="id">ID</label>
          <input
            type="id"
            id="id"
            placeholder="Enter your ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={handleTogglePassword}
          >
            <span role="img" aria-label="toggle visibility">👁️</span>
          </button>
        </div>
        <div className={styles.options}>
          <label>
            <input type="checkbox" id="keep-logged-in" />
            Keep me logged in
          </label>
          <a onClick={testApi}  className={styles.forgotPassword}>Forgot password?</a>
        </div>
        <button type="submit" className={styles.signIn}>Sign in</button>
        <div className={styles.register}>
          <p>Not a member yet? <a href="" onClick={handleSginUp}>Register now</a></p>
        </div>
      </form>
    </div>
  </div>
);
};

export default Login;



