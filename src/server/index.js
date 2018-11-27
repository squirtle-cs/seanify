/**
 * @module server/index.js
 * @description Entry Point for Server
 */

const express = require('express');

const PORT = 3000;

const app = express();

// Import Middleware to interface with Spotify API
const spotifyController = require('./controllers/spotifyController');

// GET Route - Get Spotify Authorization
app.get('/spotify-login',
  spotifyController.getAuthCode,
  (req, res) => res.redirect(res.locals.redirectUrl));

// GET Route - Get Spotify Authorization
app.get('/callback/spotify',
  spotifyController.getAuthToken,
  (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
  });

// POST Route - Get Spotify Playlist
app.post('/get-spotify-playlist',
  spotifyController.getToken,
  spotifyController.getPlaylists,
  (req, res) => res.status(200).json(res.locals));

app.listen(PORT, () => console.log(`Server Listening on PORT: ${PORT}`));
