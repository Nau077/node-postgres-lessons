const knex = require("../../config/knex.config");
const TOKENS_TABLE = "tokens";
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class TokensRepository {
  async getToken(userId) {
    try {
      const token = await knex(TOKENS_TABLE).select("*").where({
        "tokens.user_id": userId,
      });

      if (!token[0]) {
        return null;
      }

      return token[0];
    } catch (error) {
      throw new DataBaseError(error.get("DATA_BASE_ERROR"));
    }
  }

  async deleteToken(id) {
    try {
      const result = await knex(TOKENS_TABLE)
        .del()
        .where({
          id,
        })
        .returning("id");

      if (!result[0]) {
        throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      }

      return {
        id: result[0],
      };
    } catch (error) {
      throw error;
    }
  }

  async addToken(fields) {
    try {
      const result = await knex(TOKENS_TABLE).insert(fields).returning("*");

      return result;
    } catch (error) {
      throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
    }
  }

  async updateToken(id, fields) {
    try {
      const result = await knex(TOKENS_TABLE)
        .where({ id })
        .update(fields)
        .returning("*");

      if (!result[0].id) {
        throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
      }

      return result[0];
    } catch (error) {
      console.error(error);
      throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
    }
  }
};
