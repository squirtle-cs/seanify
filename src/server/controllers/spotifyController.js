/**
 * @module spotifyController.js
 * @description Middleware for Spotify API
 */

// Dependencies: Fetch and Query String Parsing
const fetch = require('node-fetch');
const qs = require('qs');

// Access dotenv for Spotify token
require('dotenv').config();

const getAuthCode = (req, res, next) => {
  const scopes = 'playlist-read-private';
  res.locals.redirectUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOT_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent('http://localhost:3000/spotify-callback/')}`;
  return next();
};

const getToken = (req, res, next) => {
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.SPOT_CLIENT_ID,
      client_secret: process.env.SPOT_CLIENT_SECRET,
    }),
  })
    .then(data => data.json())
    .then((data) => {
      res.locals.spotifyToken = data.access_token;
      return next();
    })
    .catch(spotErr => console.error('Error: Could Not Retrieve Token From Spotify: ', spotErr));
};

const getAuthToken = (req, res, next) => {
  
}

const getPlaylists = (req, res, next) => {
  fetch('https://api.spotify.com//v1/me/playlists', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${res.locals.spotifyToken}`,
    },
  })
    .then(data => data.json())
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    .catch(spotErr => console.error('Error: Could Not Retrieve Playlists From Spotify: ', spotErr));
};

module.exports = {
  getAuthCode,
  getAuthToken,
  getPlaylists,
  getToken,
};
