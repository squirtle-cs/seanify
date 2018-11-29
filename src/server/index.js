/**
 * @module server/index.js
 * @description Entry Point for Server
 */

// Import Express to activate server, Cookie Parser to retrieve cookie data
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Import Middleware to interface with Spotify API and Manage Cookies
const cookieController = require('./controllers/cookieController');
const googleController = require('./controllers/googleController');
const spotifyController = require('./controllers/spotifyController');

// GET Route - Get Spotify Authorization Code
app.get('/spotify/login',
  spotifyController.getAuthCode,
  (req, res) => {
    res.redirect(res.locals.redirectUrl);
  });

// GET Route - Get Spotify Token > Set to cookies { sToken: token }
app.get('/callback/spotify',
  spotifyController.getAuthToken,
  cookieController.setCookie,
  (req, res) => res.redirect('/spotify/playlists'));

// GET Route - Get Spotify Playlists > Return Parsed Playlists
app.get('/spotify/playlists',
  spotifyController.getUserPlaylists,
  spotifyController.parseUserPlaylists,
  (req, res) => {
    res.status(200).json(res.locals.parsedPlaylists);
  });

// GET Route - Get Spotify Songs for Playlist
app.get('/spotify/playlist/:id',
  spotifyController.getSongs,
  spotifyController.parseSongs,
  (req, res) => res.status(200).json(res.locals.parsedSongs));

// app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/index.html')));
app.use(express.static(`${__dirname}/../../dist`));

// GET Route - Get Spotify Authorization Code
app.get('/google/login',
  googleController.getAuthCode,
  (req, res) => res.redirect(res.locals.googleUrl));

// GET Route - Get Google Token > Set to cookies { gToken: token }
app.get('/callback/google',
  googleController.getAuthToken,
  cookieController.setCookie,
  (req, res) => res.redirect('/'));

// GET Route - Get YouTube Search Query Results
app.get('/google/search/:query',
  googleController.query,
  googleController.parseQuery,
  (req, res) => res.status(200).json(res.locals.parsedQuery));

// GET Route - Generate YouTube Playlist
app.get('/google/playlist/create/:playlistName',
  googleController.createPlaylist,
  (req, res) => res.status(200).json(res.locals.newPlaylistId));

// GET Route - Generate YouTube Playlist
app.get('/google/playlist/:playlistId/addSong/:songId',
  googleController.addToPlaylist,
  (req, res) => res.status(200).json(res.locals.playlistUrl));

app.listen(PORT, () => console.log(`Server Listening on PORT: ${PORT}`));
