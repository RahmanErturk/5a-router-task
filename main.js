import express from "express";

import records from "./router/recordsRouter.js";
import users from "./router/usersRouter.js";

const server = express();
const port = 3001;

server.use(express.json());
server.use((req, res, next) => {
  console.log(req.method, req.url);

  next();
});

server.use("/records", records);
server.use("/users", users);

server.use((req, res) => res.status(404).end());

server.listen(port, () => {
  console.log("listening on port " + port);
});
