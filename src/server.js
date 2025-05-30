import http from "node:http";
import dotenv from "dotenv";
import { routes } from "./routes.js";
import { json } from "./middlewares/json.js";

dotenv.config();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method == method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path)
    const params = {...routeParams.groups}

    req.params = params

    return route.handler(req, res);
  }

  res.writeHead(404).end("This path does not exists!");
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
