import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { logout } from '../../shared/utils/auth';
import { getActions } from '../../store/actions/roomActions';
import { connect } from 'react-redux';
const BasicMenu = ({ audioOnly, setAudioOnly }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const menuOpenHandler = event => {
    setAnchorEl(event.currentTarget);
  };
  const menuCloseHandler = () => {
    setAnchorEl(null);
  };
  const audioOnlyHandler = () => {
    setAudioOnly(!audioOnly);
  };
  return (
    <div>
      <IconButton onClick={menuOpenHandler} style={{ color: '#fff' }}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={menuCloseHandler}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={audioOnlyHandler}>
          {audioOnly ? 'Audio Only Enabled' : 'Audio Only Disabled'}
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};
const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(BasicMenu);
