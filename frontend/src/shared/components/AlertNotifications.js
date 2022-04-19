import React from 'react';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/alertActions';

const AlertNotifications = ({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={6000}
    >
      <Alert severity="info">
        {alertMessageContent?.message ?? alertMessageContent}
      </Alert>
    </Snackbar>
  );
};

// state =>, state.alert
const mapStoreStateToProps = ({ alert }) => {
  return {
    ...alert,
  };
};
const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(AlertNotifications);
