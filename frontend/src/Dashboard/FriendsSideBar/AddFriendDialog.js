import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ReactLoading from 'react-loading';

import { Tooltip } from '@mui/material';

import { validateMail } from '../../shared/utils/validators';
import InputWithLabel from '../../shared/components/InputWithLabel';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';

const invalidFormMessage = () => {
  return 'Invalid mail';
};
const validFormMessage = () => {
  return 'Send friend request';
};
const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation = () => {},
}) => {
  const [mail, setMail] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [lable, setLable] = useState('Send');

  const sendInvitationHandler = () => {
    // Send Friend Request to sever
  };
  const onCloseDialog = () => {
    closeDialogHandler();
    setMail('');
  };

  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);
  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onClose={onCloseDialog}
        sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
      >
        <DialogTitle>
          <Typography>Invite a Friend</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="string">
              Enter e-mail address of friend which you would like to invite
            </Typography>
          </DialogContentText>

          <InputWithLabel
            label="Mail"
            type="email"
            value={mail}
            setValue={setMail}
            placeholder="Enter email address"
            additionalStyles={{
              background: '#fff',
              color: '#000',
              outline: '1px solid #5865F2',
              border: '1px solid #5865F2',
            }}
          />
        </DialogContent>
        <Tooltip
          title={!isFormValid ? invalidFormMessage() : validFormMessage()}
        >
          <DialogActions>
            <CustomPrimaryButton
              onClick={() => {
                setLable(<ReactLoading type="cylon" />);
                setTimeout(function () {
                  setLable('Send');
                  sendInvitationHandler();
                }, 1000);
              }}
              // disabled={!isFormValid}
              label={lable}
              additionalStyles={{
                marginTop: '15px',
                marginRight: '15px',
                marginBottom: '10px',
                marginLeft: '15px',
                overflow: 'hidden',
              }}
            />
          </DialogActions>
        </Tooltip>
      </Dialog>
    </div>
  );
};

export default AddFriendDialog;
