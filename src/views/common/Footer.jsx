import React from 'react';

const Footer = ({onLogOut}) => {
  return (
    <div>
      <p onClick={onLogOut}>임시 로그아웃(클릭하면 로그아웃)</p>
    </div>
  );
};

export default Footer;