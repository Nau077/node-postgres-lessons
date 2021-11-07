require("dotenv").config();
const pg = require("pg");
const fs = require("fs");
const sql = fs.readFileSync("pg_school_demo.sql").toString();

const config = {
  user: "schooluser",
  database: "schooltestdb",
  password: "admin",
  port: process.env.DB_PORT,
};

const pool = new pg.Pool(config);

pool.connect(function (err, client, done) {
  if (err) {
    console.log("error: ", err);
    process.exit(1);
  }

  client.query(sql, function (err, _) {
    done();
    if (err) {
      console.log("error: ", err);
      process.exit(1);
    }
    process.exit(0);
  });
});
// pool shutdown
pool.end();
