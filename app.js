const express = require("express");
const cor = require("cors");

const server = express();
const routes = express.Router();

server.use(cor());
server.use(express.json());
server.use(routes);
