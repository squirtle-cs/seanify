// connecting to the database
require('dotenv').config();

const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const cn = process.env.DB_URI;
const db = pgp(cn);

module.exports = db;
