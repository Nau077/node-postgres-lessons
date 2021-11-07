const paymentController = require("../controllers/payment.controller");

module.exports = function (app) {
  app.post("/api/payment/", paymentController.pay);
};
