/**
 * @module spotifyController.js
 * @description Middleware for Spotify API
 */

// Dependencies: Fetch and Query String Parsing
const fetch = require('node-fetch');
const qs = require('qs');

// Access dotenv for Spotify token
require('dotenv').config();

/**
 * Middleware to generate Spotify redirect URL to retrieve User Authorization
 * @param {Request} _ Express HTTP Request Object
 * @param {Response} res Express HTTP Response Object
 * @param {*} next Express Function to Call Next Middleware
 */
const getAuthCode = (_, res, next) => {
  // Set scope of access that user will grant our application and generate URL
  const scope = 'playlist-read-private';
  res.locals.redirectUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOT_CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(process.env.SPOT_REDIRECT_URI)}`;
  return next();
};

/**
 * Middleware to Retrieve User Access Token with Code Query Parameter
 * @param {Request} req Express HTTP Request Object
 * @param {Response} res Express HTTP Response Object
 * @param {*} next Express Function to Call Next Middleware
 */
const getAuthToken = (req, res, next) => {
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.SPOT_CLIENT_ID}:${process.env.SPOT_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: process.env.SPOT_REDIRECT_URI,
    }),
  })
    .then(data => data.json())
    .then((data) => {
      // Store User Access Token in res.locals
      res.locals.spotifyUserToken = data.access_token;
      return next();
    })
    .catch(spotErr => console.error('Error: Could Not Retrieve Token From Spotify: ', spotErr));
};

/**
 * Middleware to Retrieve Spotify Playlist Data with User Access Token
 * @param {Request} _ Express HTTP Request Object
 * @param {Response} res Express HTTP Response Object
 * @param {*} next Express Function to Call Next Middleware
 */
const getUserPlaylists = (_, res, next) => {
  // Generate endpoint string, including query parameter to indicate # of playlists to request
  const spotURL = new URL('https://api.spotify.com/v1/me/playlists');
  // Query parameter can be between 1 and 50
  const queryParams = { limit: 25 };
  spotURL.search = new URLSearchParams(queryParams);

  fetch(spotURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${res.locals.spotifyUserToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .then((data) => {
      // Store Spotify Playlist Data in res.locals
      res.locals.playlists = data;
      return next();
    })
    .catch(spotErr => console.error('Error: Could Not Retrieve User Profile From Spotify: ', spotErr));
};

/**
 * Middleware to Parse Spotify Playlist Data, return array of parsed objects
 * @param {Request} _ Express HTTP Request Object
 * @param {Response} res Express HTTP Response Object
 * @param {*} next Express Function to Call Next Middleware
 */
const parseUserPlaylists = (_, res, next) => {
  // Store Parsed Playlist Objects in res.locals Array
  res.locals.parsedPlaylists = [];
  // Parse each item in the playlist object retrieved from Spotify
  res.locals.playlists.items.forEach((playlist) => {
    const imageUri = playlist.images.length ? playlist.images[0].url : '';
    return res.locals.parsedPlaylists.push({
      playlistId: playlist.id,
      playlistName: playlist.name,
      playlistUri: playlist.external_urls.spotify,
      ownerName: playlist.owner.display_name,
      ownerUri: playlist.owner.external_urls.spotify,
      tracks: playlist.tracks.total,
      imageUri,
    });
  });
  return next();
};

module.exports = {
  getAuthCode,
  getAuthToken,
  getUserPlaylists,
  parseUserPlaylists,
};
