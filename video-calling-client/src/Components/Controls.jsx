import React, { useContext, useState } from "react";
import { SocketContext } from "../Context";
const Controls = ({ children }) => {
  const {
    callInitiated,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    callAccepted,
    initializeSocketConnection,
    call,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const [userName, setUserName] = useState("");

  const onSubmitHandler = () => {
    setName(userName);
    initializeSocketConnection();
  };

  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center p-5 m-5">
       
        {children}
        {!callInitiated && !name && (
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 flex flex-col justify-center items-center gap-4">
            <div className="w-full">
              {/* <label
                forName="userName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Name
              </label> */}
              <input
                type="text"
                placeholder="Enter Your Name"
                name="userName"
                id="userName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={onSubmitHandler}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {!call.isReceivingCall && !callAccepted && name && (
          <div className="w-full flex justify-center items-center">
            <div className="w-1/2 ">
              {/* <label
                forName="idToCall"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Enter ID to call
              </label> */}
              <input
                type="text"
                name="idToCall"
                placeholder="Enter Your Friend ID "
                id="idToCall"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setIdToCall(e.target.value)}
              />
            </div>
            <div className="mx-7">
              <button
                onClick={() => callUser(idToCall)}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Call
              </button>
            </div>
          </div>
        )}

        {callAccepted && !callEnded && (
          <div>
            <button
              onClick={leaveCall}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Hang Up
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Controls;
