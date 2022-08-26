import React, { useContext } from "react";

import { SocketContext } from "../Context";

const CallNotifier = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className="flex justify-center items-center">
         <div className="text-lg font-semibold text-blue-500"> <span className="text-orange-800">{call.name}</span> is calling .....</div>

                  <div className="mx-5 mt-5">
                  <button
            onClick={answerCall}
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Answer
          </button>
         </div>
        </div>
      )}
    </>
  );
};

export default CallNotifier;
