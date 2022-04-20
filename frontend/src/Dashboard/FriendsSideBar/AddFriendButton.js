import React, { useState } from 'react';
import CustomPrimaryButton from './../../shared/components/CustomPrimaryButton';
import AddFriendDialog from './AddFriendDialog';
const additionalStyles = {
  marginTop: '10px',
  marginLeft: '5px',
  width: '80%',
  height: '1.875rem',
  background: '#3ba55d',
};
const AddFriendButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addFriendDialogHandler = () => {
    setIsDialogOpen(true);
  };
  const closeDialogHandler = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label="Add Friend"
        onClick={addFriendDialogHandler}
      />
      <AddFriendDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={closeDialogHandler}
      />
    </>
  );
};

export default AddFriendButton;
