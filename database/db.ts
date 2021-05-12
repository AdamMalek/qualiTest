import dbConfig from "../config/database";

const Pool = require('pg').Pool;

const dbPool = new Pool({...dbConfig});

module.exports = { dbPool };