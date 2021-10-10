/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumns("teachers", {
    work_experience: { type: "text" }
  });
};

exports.down = pgm => {}; // eslint-disable-line
