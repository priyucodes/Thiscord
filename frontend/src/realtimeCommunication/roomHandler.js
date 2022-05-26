import store from '../store/store';
import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenSharingStream,
} from '../store/actions/roomActions';
import * as socketConnection from './socketConnection';
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = () => {
  const successCallbackFunc = () => {
    store.dispatch(setOpenRoom(true, true));
    socketConnection.createNewRoom();
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
};

export const newRoomCreated = data => {
  const { roomDetails } = data;

  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = data => {
  const { activeRooms } = data;

  const friends = store.getState().friends.friends;
  const rooms = [];

  // Currently Only works for the friends user has created rooms for
  activeRooms.forEach(room => {
    friends.forEach(f => {
      if (f.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUsername: f.username });
      }
    });
  });
  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = roomId => {
  const successCbFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    socketConnection.joinRoom({ roomId });
  };
  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCbFunc);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;
  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    store.dispatch(setLocalStream(null));
  }

  const screenSharingStream = store.getState().room.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach(track => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }

  store.dispatch(setRemoteStreams([]));
  webRTCHandler.closeAllConnections();

  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
