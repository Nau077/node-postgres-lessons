module.exports = class Payment {
  constructor(payment) {
    this.payment = {
      lesson_id: payment.lessonId,
      payment_amount: payment.paymentAmount,
      payment_time: payment.paymentTime,
    };
  }

  get $payment() {
    return this.payment;
  }
};
