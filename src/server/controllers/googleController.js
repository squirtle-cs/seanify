/**
 * @module googleController.js
 * @description Middleware for Google API
 */

// Access dotenv for Spotify token
require('dotenv').config();

// Dependencies: Fetch and Query String Parsing
const fetch = require('node-fetch');
const qs = require('qs');

/**
 * Middleware to generate Google redirect URL to retrieve User Authorization
 * @param {Request} _ Express HTTP Request Object
 * @param {Response} res Express HTTP Response Object
 * @param {*} next Express Function to Call Next Middleware
 */
const getAuthCode = (_, res, next) => {
  // Generate endpoint string, including query parameters for auth request
  res.locals.googleUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.GOOG_CLIENT_ID}&scope=${encodeURIComponent('https://www.googleapis.com/auth/youtube')}&redirect_uri=${encodeURIComponent(process.env.GOOG_REDIRECT_URI)}`;
  return next();
};

/**
 * Middleware to Retrieve User Access Token with Code Query Parameter
 * @param {Request} req Express HTTP Request Object
 * @param {Response} res Express HTTP Response Object
 * @param {*} next Express Function to Call Next Middleware
 */
const getAuthToken = (req, res, next) => {
  fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    headers: {
      Host: 'www.googleapis.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      code: req.query.code,
      client_id: process.env.GOOG_CLIENT_ID,
      client_secret: process.env.GOOG_CLIENT_SECRET,
      redirect_uri: process.env.GOOG_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  })
    .then(data => data.json())
    .then((data) => {
      // Store Spotify User Access Token as sToken in res.locals.cookies
      res.locals.cookies = {};
      res.locals.cookies.gToken = data.access_token;
      return next();
    })
    .catch(googErr => console.error('Error: Could Not Retrieve Token From Google: ', googErr));
};

module.exports = {
  getAuthCode,
  getAuthToken,
};
