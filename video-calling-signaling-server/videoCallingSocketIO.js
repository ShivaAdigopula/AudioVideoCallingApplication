const socket = require("socket.io");
const {
  CONNECTION,
  ME,
  DISCONNECT,
  CALL_ENDED,
  CALL_USER,
  ANSWER_CALL,
  CALL_ACCEPTED,
} = require("./constants");
const logger = require("./logger");

const initVideoCallingSocketIO = (server) => {
  logger.info("initializing video calling socket io");
  const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on(CONNECTION, (socket) => {
    socket.emit(ME, socket.id);

    socket.on(DISCONNECT, () => {
      socket.broadcast.emit(CALL_ENDED);
    });

    socket.on(CALL_USER, ({ userToCall, signalData, from, name }) => {
      logger.info(`${name} with address ${from} is calling ${userToCall}`);
      io.to(userToCall).emit(CALL_USER, { signal: signalData, from, name });
    });

    socket.on(ANSWER_CALL, (data) => {
      logger.info(`user accepted the call from ${data.to}`);
      io.to(data.to).emit(CALL_ACCEPTED, data.signal);
    });
  });
};

module.exports = { initVideoCallingSocketIO };
