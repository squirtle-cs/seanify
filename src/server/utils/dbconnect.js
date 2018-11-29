// connecting to the database
require('dotenv').config();

const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const cn = process.env.DB_URI;

const db = pgp(cn);

module.exports = db;


/* just in case doesn't work */
/* 
// const cn = new pgp.Client({
//   user: process.env.DB_URI_USER,
//   password: process.env.DB_URI_PASSWORD,
//   database: process.env.DB_URI_DATABSE,
//   port: process.env.DB_URI_PORT,
//   host: process.env.DB_URI_HOST,
//   ssl: process.env.DB_URI_SSL
// })// database link here;

// DB_URI_USER=homrnxsbulizuf
// DB_URI_PASSWORD=0c7f804b03be0f1f426db284c3523d563772f249648396c7d785a40853ada330
// DB_URI_DATABASE=d8ohnr7omkuvgn
// DB_URI_PORT=5432
// DB_URI_HOST=ec2-54-197-234-33.compute-1.amazonaws.com
// DB_URI_SSL=true
*/