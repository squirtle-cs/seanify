/**
 * @module server/index.js
 * @description Entry Point for Server
 */

const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const db = require('./utils/dbconnect');


// use statements
app.use(bodyParser.json());

// deploys all the files that is in your dist folder
app.use(express.static('dist'));


app.listen(PORT, () => console.log(`Server Listening on PORT: ${PORT}`));

db.connect();

