import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/authActions';
// ded import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import AuthBox from '../../shared/components/AuthBox';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterPageFooter';

import { validateRegisterForm } from '../../shared/utils/validators';

function RegisterPage({ register }) {
  const navigate = useNavigate();

  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const registerHandler = () => {
    const userDetails = { mail, username, password };
    register(userDetails, navigate);
  };
  useEffect(() => {
    setIsFormValid(validateRegisterForm({ mail, username, password }));
  }, [mail, username, password, setIsFormValid]);

  return (
    <AuthBox>
      <>
        <Typography align="center" variant="h5" sx={{ color: '#fff' }}>
          Create an account
        </Typography>
        <Typography align="center" sx={{ color: '#b9bbbe' }}>
          Thanks for joining our family
        </Typography>
      </>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        isFormValid={isFormValid}
        registerHandler={registerHandler}
      />
    </AuthBox>
  );
}

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(RegisterPage);
