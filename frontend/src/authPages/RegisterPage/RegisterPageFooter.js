import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';

import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const invalidFormMessage = () => {
  return 'Username should contain between 2 and 12 characters, enter a valid e-mail address and password should contain between 8 and 20 characters';
};
const validFormMessage = () => {
  return 'Kindly Register';
};

function RegisterPageFooter({ registerHandler, isFormValid }) {
  const [isLoading, setLoading] = useState(false);
  const [lable, setLable] = useState('Log in');
  const navigate = useNavigate();
  const pushToLoginPageHandler = () => {
    // history.push('/register'); replaced by
    navigate('/login');
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
                setLable('Register');
                registerHandler();
              }, 2000);
            }}
          />
          {/* {isLoading ? <ReactLoading type="bubbles" /> : null} */}
        </div>
      </Tooltip>

      <RedirectInfo
        text=""
        redirectText="Already have an account? "
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={pushToLoginPageHandler}
      />
    </>
  );
}

export default RegisterPageFooter;
