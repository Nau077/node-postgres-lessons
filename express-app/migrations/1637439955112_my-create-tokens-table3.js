/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("tokens", {
        token: { type: "varchar(300)", unique: true },
        id: { type: "serial", primaryKey: true },
        user_id: { type: "VARCHAR(50)", notNull: true },
        role: { type: "VARCHAR(50)", notNull: true }
  });
};
