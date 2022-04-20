import React from 'react';
import { styled } from '@mui/system';
import DropdownMenu from './DropdownMenu';

const MainContainer = styled('div')({
  position: 'absolute',
  right: 0,
  top: 0,
  height: '3rem',
  borderBottom: '1px solid #000',
  backgroundColor: '#36393f',
  width: 'calc(100% - 19.89rem)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 15px',
});
const AppBar = () => {
  return (
    <MainContainer>
      <DropdownMenu />
    </MainContainer>
  );
};

export default AppBar;
