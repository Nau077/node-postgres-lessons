const PaymentUseCase = require("../../domain-layer/use-cases/payment.use-case");

exports.pay = async (req, res) => {
  try {
    const paymentUseCase = new PaymentUseCase();
    const data = req.body;

    if (data?.lessonsId) {
      const lessonsId = data.lessonsId;
      const result = await paymentUseCase.pay(lessonsId);
      return res.status(200).send(result);
    } else {
      return res.status(400).send("Нет данных совершения оплаты");
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.code).send(error.message);
    } else {
      return res.status(400).send(error);
    }
  }
};
