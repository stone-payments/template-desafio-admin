import * as jsonServer from "json-server";
import * as path from "path";
import cors from "cors";
import express from "express";
import { db } from "./generator";

/**
 * Local, on development environment
 * API: http://localhost:3001/api/users
 * React App: http://localhost:3000
 *
 * Cloud, on production environment
 * API: http://localhost:3000/api/users
 * React App: http://localhost:3000
 */

let port = "3000";
const server = express();
const isDev = process.env.NODE_ENV !== "production";

if (isDev) {
  server.use(cors());
  port = "3001";
}

if (!isDev) {
  // Priority serve any static files.
  server.use(express.static(path.resolve(__dirname, "../../build")));
}

// Answer API requests.
server.use("/api", jsonServer.defaults(), jsonServer.router(db));

if (!isDev) {
  // All remaining requests return the React app, so it can handle routing.
  server.get("*", function (req: any, res: any) {
    res.sendFile(path.join(__dirname, "../../build", "index.html"));
  });
}

server.listen(port, () => {
  console.log(
    `API running on port ${port}, access it with http://localhost:${port}/api/users \n
    React App running on port 3000, access it with http://localhost:3000/`
  );
});
