const Pool = require('pg').Pool;

const dbConfig = {
    user: "postgres",
    password: "GbkGS=nD6hfy",
    database: "quali_test",
    host: "localhost",
    port: 5432
}

const pool = new Pool({...dbConfig});

module.exports = { pool };