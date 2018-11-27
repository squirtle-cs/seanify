/**
 * @module server/index.js
 * @description Entry Point for Server
 */

// Import Express to activate server
const express = require('express');

const app = express();
const PORT = 3000;

// Import Middleware to interface with Spotify API
const spotifyController = require('./controllers/spotifyController');

// GET Route - Get Spotify Authorization Code
app.get('/spotify-login',
  spotifyController.getAuthCode,
  (req, res) => res.redirect(res.locals.redirectUrl));

// GET Route - Get Spotify Token > Retreive and Parse Playlists > Return Parsed Playlists
app.get('/callback/spotify',
  spotifyController.getAuthToken,
  spotifyController.getUserPlaylists,
  spotifyController.parseUserPlaylists,
  (req, res) => res.status(200).json(res.locals.parsedPlaylists));

app.listen(PORT, () => console.log(`Server Listening on PORT: ${PORT}`));
