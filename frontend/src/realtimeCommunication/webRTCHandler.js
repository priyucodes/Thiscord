import Peer from 'simple-peer';
import store from '../store/store';
import { setLocalStream, setRemoteStreams } from '../store/actions/roomActions';
import * as socketConnection from './socketConnection';
const getConfiguration = () => {
  const turnIceServers = null;
  if (turnIceServers) {
    // use TURN server credentials
  } else {
    console.warn('Using only STUN server');
    return {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    };
  }
};

const onlyAudioConstraints = {
  audio: true,
  video: false,
};
const defaultConstraints = {
  audio: true,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: 'user',
    // optional: [
    //   { minWidth: 320 },
    //   { minWidth: 640 },
    //   { minWidth: 1024 },
    //   { minWidth: 1280 },
    //   { minWidth: 1920 },
    //   { minWidth: 2560 },
    // ],
  },
};

export const getLocalStreamPreview = (onlyAudio = false, callbackFunction) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      store.dispatch(setLocalStream(stream));
      callbackFunction();
    })
    .catch(err => {
      console.error(err);
      console.log('Cannot get access to local stream!');
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream;

  if (isInitiator) {
    console.log('Prepare new peer connection as initiator');
  } else {
    console.log('Prepare new peer connection as NOT initiator');
  }
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on('signal', data => {
    // SDP Info n ICE candidates
    const signalData = {
      signal: data,
      connUserSocketId,
    };

    socketConnection.signalPeerData(signalData);
  });

  peers[connUserSocketId].on('stream', remoteStream => {
    // Add new remote stream to serverStore
    console.log(remoteStream);
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = data => {
  const { connUserSocketId, signal } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

const addNewRemoteStream = newRemoteStream => {
  const remoteStreams = store.getState().room.remoteStreams;

  const newRemoteStreams = [...remoteStreams, newRemoteStream];

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach(mappedObj => {
    const connUserSocketId = mappedObj[0];
    if (peers[connUserSocketId]) {
      // simple-peer gives us destroy method
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
  // {{key:value}} -> [key,value]
};

export const handleParticipantLeftRoom = data => {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;

  const newRemoteStreams = remoteStreams.filter(remoteStream => {
    return remoteStream.connUserSocketId !== connUserSocketId;
  });
  store.dispatch(setRemoteStreams(newRemoteStreams));
};

// simple-peer docs (similar to webRTC RTPsender,replaceTrack)
export const switchOutgoingTracks = stream => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};
