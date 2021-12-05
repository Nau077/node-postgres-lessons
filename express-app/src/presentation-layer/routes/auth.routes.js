const auth = require("../controllers/auth.controller");
const verifySignUp = require("../middleware/verify-sign-up.middleware");

module.exports = function (app) {
  app.post(
    "/api/auth/signUp",
    [
      verifySignUp.checkRolesExisted,
      verifySignUp.checkDuplicateUserPhone
    ],
   auth.signUp
   );
  app.post("/api/auth/signIn", auth.signIn);
  app.put("/api/auth/refreshTokens", auth.refreshTokens);
};
