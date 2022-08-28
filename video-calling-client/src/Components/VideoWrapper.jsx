import React, { useContext } from "react";
import { SocketContext } from "../Context";
export const VideoWrapper = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <>
      <div className="flex flex-col w-full h-full justify-center items-center sm:flex-row md:flex-row lg:flex-row xl:flex-row">
        {stream && (
          <div className="flex flex-col justify-center items-center h-full  w-screen sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
            <div>
              <video
                playsInline
                ref={myVideo}
                autoPlay
                // width="320" height="220"
                className="w-[320px] h-1/4"
                // className="object-cover overflow-hidden"
              />
            </div>
            <div>{name}</div>
          </div>
        )}

        {!callEnded && callAccepted && (
          <div className="flex flex-col justify-center items-center h-full  w-screen sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
            <div>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                width="320" height="220"
              />
            </div>
            <div>{call.name}</div>
          </div>
        )}
      </div>
    </>
  );
};
