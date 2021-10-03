module.exports = class Payment {
  constructor(payment) {
    this.lesson = {
      id: payment.id,
      lesson_id: payment.lesson_id,
      payment_amount: payment.payment_amount,
      payment_time: payment.payment_tinme
    };
  }

  get $payment() {
    return this.payment;
  }
};
