const dotenv = require("dotenv");
const express = require("express");
const pino = require("pino-http")();
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { initVideoCallingSocketIO } = require("./videoCallingSocketIO");
dotenv.config(); // read configuration from .env file
app.use(express.static("public"));
app.use(pino);
app.use(cors({ origin: "localhost", credentials: true }));

const PORT = process.env.VIDEO_CALLING_SIGNALLING_SERVER_PORT || 80;

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

initVideoCallingSocketIO(server);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
