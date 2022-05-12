import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/system';
import SideBar from './SideBar/SideBar';
import FriendsSideBar from './FriendsSideBar/FriendsSideBar';
import Messenger from './Messenger/Messenger';
import AppBar from './AppBar/AppBar';
import { logout } from '../shared/utils/auth';
import { getActions } from '../store/actions/authActions';
import { connectWithSocketServer } from '../realtimeCommunication/socketConnection';

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

function Dashboard({ setUserDetails }) {
  useEffect(
    () => {
      const userDetails = localStorage.getItem('user');
      if (!userDetails) {
        logout();
        // window.location.pathname = 'login';
      } else {
        setUserDetails(JSON.parse(userDetails));
        connectWithSocketServer(JSON.parse(userDetails));
      }
    },
    // Only run once at start when componentMounts
    // Giving it an empty array acts like componentDidMount as in, it only runs once

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
}

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
  };
};
// mapstatetoprops,mapactionstoprops
export default connect(null, mapActionsToProps)(Dashboard);
