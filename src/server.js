import http from "node:http";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer((req, res) => {
  res.end("Hello world!");
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
