import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { getActions } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import AuthBox from '../../shared/components/AuthBox';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';

import { validateLoginForm } from '../../shared/utils/validators';
function LoginPage({ login }) {
  const navigate = useNavigate();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const loginHandler = () => {
    const userDetails = { mail, password };
    login(userDetails, navigate);
  };
  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} loginHandler={loginHandler} />
    </AuthBox>
  );
}

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
  };
};

// The connect() function connects a React component to a Redux store. It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

export default connect(null, mapActionsToProps)(LoginPage);
