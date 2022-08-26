import React, { useContext } from "react";
import { SocketContext } from "../Context";
export const VideoWrapper = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);

  console.log({ call: JSON.stringify(call) });

  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        {stream && (
          <div className="flex flex-col justify-center items-center h-full  w-1/2">
            <div>
              <video
                playsInline
                ref={myVideo}
                autoPlay
                className="object-cover overflow-hidden"
              />
            </div>
            <div>{name}</div>
          </div>
        )}

        {!callEnded && callAccepted && (
          <div className="flex flex-col justify-center items-center h-full  w-1/2">
            <div>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className="object-cover overflow-hidden"
              />
            </div>
            <div>{call.name}</div>
          </div>
        )}
      </div>
    </>
  );
};
