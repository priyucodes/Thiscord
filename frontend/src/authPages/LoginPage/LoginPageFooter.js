import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';

import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const invalidFormMessage = () => {
  return 'Invalid credentials';
};
const validFormMessage = () => {
  return 'Kindly Login';
};

function LoginPageFooter({ loginHandler, isFormValid }) {
  const [isLoading, setLoading] = useState(false);
  const [lable, setLable] = useState('Log in');
  const navigate = useNavigate();
  const pushToRegisterPageHandler = () => {
    // history.push('/register'); replaced by
    navigate('/register');
  };
  return (
    <>
      <Tooltip title={!isFormValid ? invalidFormMessage() : validFormMessage()}>
        <div>
          <CustomPrimaryButton
            label={lable}
            additionalStyles={{ marginTop: '30px' }}
            disabled={!isFormValid}
            onClick={() => {
              // This may look like Loading state is useless it is but I kept it like this so can get future reference :) wkwk
              setLoading(true);
              setLable(<ReactLoading type="bubbles" />);
              setTimeout(function () {
                setLoading(false);
                setLable('Log in');
                loginHandler();
              }, 2000);
            }}
          />
          {/* {isLoading ? <ReactLoading type="bubbles" /> : null} */}
        </div>
      </Tooltip>

      <RedirectInfo
        text={'Need an account? '}
        redirectText="Create an account"
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={pushToRegisterPageHandler}
      />
    </>
  );
}

export default LoginPageFooter;
