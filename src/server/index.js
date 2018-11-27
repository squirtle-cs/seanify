/**
 * @module server/index.js
 * @description Entry Point for Server
 */

const express = require('express');

const PORT = 3000;

const app = express();

app.use(express.static('dist'))

app.listen(PORT, () => console.log(`Server Listening on PORT: ${PORT}`));


//// "start": "webpack-dev-server --mode development --open",
// "dev": "webpack --mode development",

    // "server": "nodemon src/server"