/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => { 
 pgm.addColumns("students", {
    password: { type: "text" },
  });};

exports.down = pgm => {};
