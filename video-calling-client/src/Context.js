import React, { createContext, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import {
  ANSWER_CALL,
  CALL_ACCEPTED,
  CALL_ENDED,
  CALL_USER,
  ME,
  SIGNAL,
  STREAM,
  HANG_UP,
} from "./constants";
const SocketContext = createContext();

let socket = null;

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [callInitiated, setCallInitiated] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const initializeCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        setTimeout(() => {
          if (myVideo && myVideo.current) {
            myVideo.current.srcObject = currentStream;
          }
        }, 0);
      });
  };

  const initializeSocketConnection = () => {
    socket = io(process.env.REACT_APP_SIGNALLING_SERVER);
    socket.on(ME, (id) => {
      console.log({ id });
      setMe(id);
    });

    socket.on(CALL_USER, ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on(CALL_ENDED, () => {
      setCallInitiated(false);
      setCallEnded(true);

      connectionRef.current.destroy();

      window.location.reload();
    });
  };

  const answerCall = () => {
    console.log({ from: call.from, me });
    if (call.from !== me) {
      initializeCamera();
    }

    setCallAccepted(true);
    setCallInitiated(true);

    setTimeout(() => {
      const peer = new Peer({ initiator: false, trickle: false, stream });
      peer.on(SIGNAL, (data) => {
        socket.emit(ANSWER_CALL, { signal: data, to: call.from });
      });

      peer.on(STREAM, (currentStream) => {
        console.log("streaming");
        userVideo.current.srcObject = currentStream;
      });

      peer.signal(call.signal);

      connectionRef.current = peer;
    }, 1000);
  };

  const callUser = (id) => {
    initializeCamera();
    setCallInitiated(true);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on(SIGNAL, (data) => {
      socket.emit(CALL_USER, {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on(STREAM, (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on(CALL_ACCEPTED, (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    socket.emit(HANG_UP, {
      userToCall: call.from,
      from: me,
    });
    setCallInitiated(false);
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        callInitiated,
        initializeCamera,
        initializeSocketConnection,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
