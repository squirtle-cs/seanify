/**
 * @module googleController.js
 * @description Middleware for Google API
 */

// Access dotenv for Spotify token
require('dotenv').config();

// Dependencies: Fetch and Query String Parsing
const fetch = require('node-fetch');
const qs = require('qs');

const fs = require('fs');
const path = require('path');

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

/**
 * Middleware to execute YouTube Search with User Access Token
 * @param {Request} req Express HTTP Request Object
 * @param {Response} res Express HTTP Response Object
 * @param {*} next Express Function to Call Next Middleware
 */
const query = (req, res, next) => {
  // Confirm Cookie - If no Google Token, redirect to google/login to refresh
  if (!req.cookies.gToken) res.redirect('/google/login');

  // Generate endpoint string, including query parameter to indicate # of playlists to request
  const googURL = new URL('https://www.googleapis.com/youtube/v3/search');
  // Query parameter can be between 1 and 50
  const queryParams = {
    part: 'snippet',
    q: req.params.query,
  };
  googURL.search = new URLSearchParams(queryParams);

  fetch(googURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.cookies.gToken}`,
      'Content-Type': 'application/json',
      Host: 'www.googleapis.com',
    },
  })
    .then(data => data.json())
    .then((data) => {
      // Store Spotify Playlist Data in res.locals
      res.locals.query = data;
      fs.writeFile(path.resolve(__dirname, '../../../samples/query.json'), JSON.stringify(data, null, 2), err => console.error(err));
      return next();
    })
    .catch(googErr => console.error('Error: Could Not Retrieve User Query From Google: ', googErr));
};

/**
 * Middleware to Parse Google Search Result Data, return array of parsed objects
 * @param {Request} _ Express HTTP Request Object
 * @param {Response} res Express HTTP Response Object
 * @param {*} next Express Function to Call Next Middleware
 */
const parseQuery = (_, res, next) => {
  // Store Parsed Playlist Objects in res.locals Array
  res.locals.parsedQuery = [];
  // Parse each item in the playlist object retrieved from Spotify
  res.locals.query.items.forEach((result) => {
    return res.locals.parsedQuery.push({
      videoId: result.id.videoId,
      videoName: result.snippet.title,
      videoUri: `https://www.youtube.com/watch?v=${result.id.videoId}`,
      channelName: result.snippet.channelTitle,
      channelUrl: `https://www.youtube.com/channel/${result.snippet.channelId}`,
      imageUri: result.snippet.thumbnails.high.url,
    });
  });
  fs.writeFile(path.resolve(__dirname, '../../../samples/parsedSearch.json'), JSON.stringify(res.locals.parsedQuery, null, 2), err => console.error(err));
  return next();
};

module.exports = {
  getAuthCode,
  getAuthToken,
  parseQuery,
  query,
};
