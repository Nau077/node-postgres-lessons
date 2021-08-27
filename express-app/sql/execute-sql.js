var pg = require('pg');
var fs = require('fs');

var sql = fs.readFileSync('pg_school_demo.sql').toString();

const config = {
    user: 'schooluser',
    database: 'schooltestdb',
    password: 'admin',
    port: 5432                  //Default port, change it if needed
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);


pool.connect(function(err, client, done) {
    if(err){
        console.log('error: ', err);
        process.exit(1);
    }
  

  client.query(sql, function(err, result){
    done();
    if(err){
        console.log('error: ', err);
        process.exit(1);
    }
    process.exit(0);
    });
  })
  // pool shutdown
  pool.end()


 