require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const config = require("../config/express.config");
const server = http.createServer(app);
const { routeInit } = require("./presentation-layer/routes");

routeInit(app, express);

server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}.`);
});

// DB_PORT=5433
// DATABASE_URL=schooluser://schooluser:admin@localhost:5433/schooltestdb
