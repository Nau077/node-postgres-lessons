const knex = require("../../config/knex.config");
const ApiError = require("../utils/ErrorHelper");
const PAYMENT_TABLE = "payment";

module.exports = class PaymentRepository {
  async addPayment(fields) {
    const isStringChecked = checkStringFields(fields.lessonId);
    if (!isStringChecked) {
      let error = new ApiError("422", "Неверные поля переданы");
      throw error;
    }

    const trx = await knex.transaction();
    try {
      const result = await knex(PAYMENT_TABLE)
        .transacting(trx)
        .insert(fields)
        .returning("id");
      await trx.commit();
      return {
        id: result[0]
      };
    } catch (e) {
      trx.rollback();
      let error = new ApiError("422", "Ошибка атомарности: " + e);
      throw error;
    }
  }
};

function checkStringFields(param) {
  const IS_VALID = true;

  if (typeof param !== "string") {
    return !IS_VALID;
  }

  return IS_VALID;
}
