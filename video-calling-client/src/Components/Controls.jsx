import React, { useContext, useState } from "react";
import { SocketContext } from "../Context";
const Controls = ({ children }) => {
  const {
    callInitiated,
    me,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    callAccepted,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const [userName, setUserName] = useState("");
  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center border-solid border-1 p-5 m-5">
        {!callAccepted && name && (
          <>
            <div className="m-5">
              {" "}
              Hello{" "}
              <span className="inline text-orange-400 text-lg">{name}</span>,
              Your ID is{" "}
              <span className="inline text-orange-800 text-lg ">{me}</span>
            </div>
          </>
        )}
        {children}
        {!callInitiated && !name && (
          <div className="w-full flex justify-center items">
            <div className="w-1/2">
              <label
                forName="userName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mt-7 mx-5">
              <button
                onClick={() => setName(userName)}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {!callAccepted && name && (
          <div className="w-full flex justify-center items-center">
            <div className="w-1/2 ">
              <label
                forName="idToCall"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Enter ID to call
              </label>
              <input
                type="text"
                name="idToCall"
                id="idToCall"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setIdToCall(e.target.value)}
              />
            </div>
            <div className="mt-7 mx-7">
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
