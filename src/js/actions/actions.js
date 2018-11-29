// import { ADD_ARTICLE } from '../constants/action-types';
import * as types from '../constants/action-types';

// export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });

// logs user in and then shows playlists
export const showFromPlaylists = (playlists) => ({
  type: types.SHOW_FROM_PLAYLISTS,
  payload: playlists,
});

export const loginToSpotify = () => {
  return (dispatch) => {
    return fetch("http://localhost:3000/spotify/login", {mode: 'no-cors'})
      .then((res) => {
        return res.json();
      })
      .then((playlists) => {
        console.log(playlists);
        dispatch(showFromPlaylists(playlists));
      });
  };
};

export const showFromSongs = (songs) => ({
  type: types.SHOW_FROM_SONGS,
  payload: songs,
});

export const getSpotifyPlaylistSongs = (playlistId) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/spotify/playlist/${playlistId}`, {mode: 'no-cors'})
      .then((res) => {
        return res.json();
      })
      .then((songs) => {
        console.log(songs);
        dispatch(showFromSongs(songs));
      });
  };
};
