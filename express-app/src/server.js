const express = require("express");
const app = express();
const config = require("../config/express.config");

app.listen(constants.PORT, constants.HOST, () => {
  console.log(
    `Node.js express server running on port: ${config.PORT}, host ${config.HOST}`
  );
});
