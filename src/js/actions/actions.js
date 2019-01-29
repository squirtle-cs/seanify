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
    return fetch("http://localhost:3000/spotify/login", { mode: 'no-cors' })
      .then((res) => {
        return res.json();
      })
      .then((playlists) => {
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
        dispatch(showFromSongs(songs));
      });
  };
};

export const saveYouTubeSong = (songArray) => ({
  type: types.SAVE_YOUTUBE_SONG,
  payload: songArray,
});

export const getYouTubeSong = (songName) => (dispatch) => {
  console.log('before fetch getYouTubeSong');
  return fetch(`http://localhost:3000/google/search/${songName}`, { mode: 'no-cors' })
    .then(res => res.json())
    .then((song) => {
      console.log('getYouTubeSong');
      dispatch(saveYouTubeSong(song));
    });
};
