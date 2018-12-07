import React from "react";
import connectLink from "../../assets/connect_spotify.png";

const SpotifyEntry = props => {
  const { loginToSpotify } = props;

  return (
    <div>
      <img
        src={connectLink}
        onClick={loginToSpotify}
        className="imgLink"
        alt="login to Spotify"
      />
    </div>
  );
};

export default SpotifyEntry;

// spotify/playlist/:id
// use redux thunk;

// each playlist obj will look like this:
// `[
//   {
//     "playlistId": string,
//     "playlistName": string,
//     "playlistUri": string,
//     "ownerName": string,
//     "ownerUri": string,
//     "tracks": number,
//     "imageUri": string,
//   },
// ]`
