/**
 * @module server/index.js
 * @description Entry Point for Server
 */

// Import Express to activate server, Cookie Parser to retrieve cookie data
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// Access dotenv 
require('dotenv').config();

// Importing the Connect to the Database
const db = require('./utils/dbconnect');

// Requiring the parsers
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// use statements
app.use(bodyParser.json());

// deploys all the files that is in your dist folder
app.use(express.static('dist'));
app.use(cookieParser());

// Import Middleware to interface with Spotify API and Manage Cookies
const cookieController = require('./controllers/cookieController');
const googleController = require('./controllers/googleController');
const spotifyController = require('./controllers/spotifyController');

// GET Route - Get Spotify Authorization Code
app.get('/spotify/login',
  spotifyController.getAuthCode,
  (req, res) => res.redirect(res.locals.redirectUrl));

// GET Route - Get Spotify Token > Set to cookies { sToken: token }
app.get('/callback/spotify',
  spotifyController.getAuthToken,
  cookieController.setCookie,
  (req, res) => res.redirect('/'));

// GET Route - Get Spotify Playlists > Return Parsed Playlists
app.get('/spotify/playlists',
  spotifyController.getUserPlaylists,
  spotifyController.parseUserPlaylists,
  (req, res) => res.status(200).json(res.locals.parsedPlaylists));

// GET Route - Get Spotify Songs for Playlist
app.get('/spotify/playlist/:id',
  spotifyController.getSongs,
  spotifyController.parseSongs,
  (req, res) => res.status(200).json(res.locals.parsedSongs));

// GET Route - Get Spotify Authorization Code
app.get('/google/login',
  googleController.getAuthCode,
  (req, res) => res.redirect(res.locals.googleUrl));

// GET Route - Get Spotify Token > Set to cookies { sToken: token }
app.get('/callback/google',
  googleController.getAuthToken,
  cookieController.setCookie,
  (req, res) => res.redirect('/'));

// GET Route - Get Spotify Playlists > Return Parsed Playlists
app.get('/google/search/:query',
  googleController.search,
  // spotifyController.parseResults,
  (req, res) => res.status(200).json(res.locals.query));

app.listen(PORT, () => console.log(`Server Listening on PORT: ${PORT}`));

db.connect();

