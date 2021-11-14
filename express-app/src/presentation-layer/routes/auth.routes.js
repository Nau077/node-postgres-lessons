const auth = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post("/api/auth/signUp", auth.signUp);
  app.post("/api/auth/signIn", auth.signIn);
  app.put("/api/auth/updateToken", auth.updateToken);
};
