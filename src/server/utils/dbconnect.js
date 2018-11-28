const pgp = require('pg-promise')();
const cn = 'postgres://homrnxsbulizuf:0c7f804b03be0f1f426db284c3523d563772f249648396c7d785a40853ada330@ec2-54-197-234-33.compute-1.amazonaws.com:5432/d8ohnr7omkuvgn' // database link here;
const db = pgp(cn);

module.exports = db;