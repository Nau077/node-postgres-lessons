/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("tokens", {
    refreshToken: { type: "varchar(1000)", unique: true },
    id: { type: "serial", primaryKey: true },
  });
};
exports.down = (pgm) => {};
