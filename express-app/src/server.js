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
// добавить соответствующий env
// DB_PORT=5433
// DATABASE_URL=schooluser://schooluser:admin@localhost:5433/schooltestdb npm run migrate up

// npm install node-pg-migrate
// npm run migrate create my first migration
// DATABASE_URL=postgres://test:test@localhost:5432/test npm run migrate up

// npm run migrate create token table
// npm run migrate up

// mapFields сделать нормальным - добавить через super вызов
// сделать переименование на addOne, getOne
// getOne student по phoneNumber идёт

// ***

// verify-sign-up.middleware - прописать мидлваре в auth.routes
// расписать ошибки в классе ошибки по всей авторизации
// протестировать регистрацию, взаимодействие с токенами

// в tokens-helper в payload не приходит userId в payload
// т.к в payload попадают данные из payload refresh токена
// решить вопрос
