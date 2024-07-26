import React, { useState } from 'react';
import styles from './SignUp.module.css';

const SignUp = () => {
const [newName, setNewName] = useState('');
const [newId, setNewId] = useState('');
const [newPassword, setNewPassword] = useState('');

const handleSignUp = (event) => {
  event.preventDefault();
 
  if (newName.trim() === '' || newId.trim() === '' || newPassword.trim() === '') {
    alert('누락된 값 없이 입력해주세요.');
    return;
  }

  

};

return (
  <div>
    <h1>회원가입 화면</h1>
  </div>
);
};

export default SignUp;



