import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = ({onLogin}) => {
const [userId, setUserId] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

const handleSubmit = (event) => {
  event.preventDefault();
 
  if (userId.trim() === '' || password.trim() === '') {
    alert('사용자 이름과 비밀번호를 입력해주세요.');
    return;
  }
  onLogin(userId);
  // setAlertFlag(true);
  // setTimeout(() => {
  //   onLogin(userId);
  //   // setAlertFlag(false);
  // }, 1500);
};

const handleTogglePassword = () => {
  setShowPassword(!showPassword);
};

return (
  <div className={styles.container}>
    <div className={styles.logo}>
      <img src="logo.png" alt="Logo" />
    </div>
    <div className={styles.loginBox}>
      <h2>Welcome back <span role="img" aria-label="wave">👋</span></h2>
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
          <a href="#" className={styles.forgotPassword}>Forgot password?</a>
        </div>
        <button type="submit" className={styles.signIn}>Sign in</button>
        <div className={styles.socialLogin}>
          <p>OR</p>
          <div className={styles.socialButtons}>
            <button className={`${styles.google} ${styles.socialButton}`}>G</button>
            <button className={`${styles.facebook} ${styles.socialButton}`}>f</button>
            <button className={`${styles.apple} ${styles.socialButton}`}></button>
          </div>
        </div>
        <div className={styles.register}>
          <p>Not a member yet? <a href="#">Register now</a></p>
        </div>
      </form>
    </div>
    <footer>
      <p>Made with <a href="#">Yisily</a></p>
    </footer>
  </div>
);
};

export default Login;



