import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import * as roomHandler from '../../realtimeCommunication/roomHandler';

const CreateRoomButton = ({ isUserInRoom }) => {
  const createNewRoomHandler = () => {
    roomHandler.createNewRoom();
  };
  return (
    <Button
      disabled={isUserInRoom}
      onClick={createNewRoomHandler}
      style={{
        width: '3rem',
        height: '3rem',
        borderRadius: '1rem',
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: '10px',
        color: '#fff',
        backgroundColor: '#5865F2',
      }}
    >
      <AddIcon />
    </Button>
  );
};

export default CreateRoomButton;
