import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputWithLabel from '../../shared/components/InputWithLabel';
import { styled } from '@mui/system';

const PasswordContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
});
const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  const [passwordType, setPasswordType] = useState('password');
  const tooglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-mail"
        type="text"
        placeholder="Enter your e-mail address"
      />
      <PasswordContainer>
        <InputWithLabel
          value={password}
          setValue={setPassword}
          label="Password"
          type={passwordType}
          placeholder="Enter your password"
        />
        {passwordType === 'password' ? (
          <VisibilityIcon
            sx={{
              color: '#b9bbbe',
              position: 'absolute',
              right: 20,
              top: 62,
              cursor: 'pointer',
            }}
            onClick={tooglePassword}
          />
        ) : (
          <VisibilityOffIcon
            sx={{
              color: '#b9bbbe',
              position: 'absolute',
              right: 20,
              top: 62,
              cursor: 'pointer',
            }}
            onClick={tooglePassword}
          />
        )}
      </PasswordContainer>
    </>
  );
};

export default LoginPageInputs;
