import React, { useState } from 'react';
import styles from './SignUp.module.css';
import {  useNavigate  } from "react-router-dom";
import {  doNewUser } from 'apis/springApi';

const SignUp = () => {
const [newName, setNewName] = useState('');
const [newId, setNewId] = useState('');
const [newPassword, setNewPassword] = useState('');
const navigate = useNavigate();

const handleSignUp = async (event) => {
  event.preventDefault();
 
  if (newName.trim() === '' || newId.trim() === '' || newPassword.trim() === '') {
    alert('누락된 값 없이 입력해주세요.');
    return;
  }

  const successSignUp = await doNewUser(newId, newPassword, newName);
  if(successSignUp === 1){
    alert('회원가입이 완료되었습니다!.!');
    navigate('/login');
  } else {
    alert('중복된 ID가 존재합니다.');
  }
};

const handleSignIn = (event) => {
  setNewName('');
  setNewId('');
  setNewPassword('');
  navigate('/login');
};

return (
  <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <img src="/image/messege.JPG" alt="Logo" />
        </div>
        <div className={styles.welcome}>
          <h1>Welcome!</h1>
          <h2>First things first...</h2>
          <p>Consequat adipisicing eas do labore irure adipisicing occaecat cupidatat excepteur duis mo</p>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2>Create an account</h2>
          <form>
            <input type="text" placeholder="Full name" className={styles.inputField} value={newName} onChange={(e) => setNewName(e.target.value)} />
            <input type="id" placeholder="ID" className={styles.inputField} value={newId} onChange={(e) => setNewId(e.target.value)}/>
            <input type="password" placeholder="Password" className={styles.inputField} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            <button type="submit" className={styles.signUpButton} onClick={handleSignUp}>Sign up</button>
          </form>
          <div className={styles.signInLink}>
            Already have an account? <a href="" onClick={handleSignIn}>Sign in</a>
          </div>
        </div>
      </div>
    </div>
);
};

export default SignUp;



