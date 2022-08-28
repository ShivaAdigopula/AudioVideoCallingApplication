import React, { useContext } from "react";
import { SocketContext } from "../Context";

const Greetings = () => {
  const { me, name } = useContext(SocketContext);
  return (
    <>
      <div className="text-[24px] !text-left w-full p-5 text-black font-medium relative">
        {name && (
          <div className="flex flex-col justify-between text-lg md:flex-row lg:flex-row xl:flex-row md:text-[18px] lg:text-[28px] xl:text-[28px] ">
            <div>
              {" "}
              Hello{" "}
              <span className="inline text-blue-700 text-xl font-medium md:text-[26px] lg:text-[26px] xl:text-[26px] ">
                {name}
              </span>
              ,
            </div>
            <div>
              ID :{" "}
              <span className="inline text-blue-700 text-xl font-medium md:text-[26px] lg:text-[26px] xl:text-[26px] ">
                {me}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Greetings;
