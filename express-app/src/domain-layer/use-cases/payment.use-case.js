const PaymentRepository = require("../../data-layer/payment.repository");
const Payment = require("../entities/payment.entity");

module.exports = class LessonstUseCase {
  async pay(params) {
    const payment = new Payment(params);
    const dataForBuilder = payment.$payment;

    try {
      const id = await new PaymentRepository().addPayment(dataForBuilder);
      return id;
    } catch (error) {
      throw error;
    }
  }
};
