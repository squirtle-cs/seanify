/**
 * @module tableController.js
 * @description Middleware for saving songs to the Database
 */

// Importing the function to save to Database
const db = require('../utils/dbconnect');

/**
 * Middleware to save song and artist, to Youtube, Spotify, Link, and PlayList Tables
 * @param {Request} req Express HTTP Request Object
 * @param {Response} res Express HTTP Response Object
 * @param {*} next Express Function to Call Next Middleware
 */

const saveSong = (req, res, next) => {
  const { song, artist } = req.body;

  // used Promise.all so we wait for both spotifyID and youtubeID
  Promise.all([
    // saving song/artist to spotify table and returns the spotifyID
    db.one(`INSERT INTO public.spotify(song, artist) VALUES($1, $2) RETURNING "spotifyID"`, [song, artist]),
    // saving song/artist to youtube table and returns the youtubeID
    db.one(`INSERT INTO public.youtube(song, artist) VALUES ($1, $2) RETURNING "youtubeID"`, [song, artist])
  ])
    .then((values) => {
      const spotifyID = values[0].spotifyID;
      const youtubeID = values[1].youtubeID;
      // saves the youtubeID with the spotifyID into the link table
      db.none(`INSERT INTO public.link("youtubeID", "spotifyID") VALUES ($1, $2)`, [youtubeID, spotifyID]);
      // saves the youtubeID into the playlist table
      db.none(`INSERT INTO public.playlist("youtubeID") VALUES ($1)`, [youtubeID])
    })
    .catch(err => {
      console.log(err);
      return err;
    })
  
  return next();
};

module.exports = {
  saveSong
}
