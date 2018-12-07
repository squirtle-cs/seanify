import * as types from '../constants/action-types';

const initialState = {
  playlists: [],
  showFromPlaylists: false,
  fromSongs: [],
  showFromSongs: false,
  showToSongs: false,
};

export default function (state = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types.SHOW_FROM_PLAYLISTS: {
      stateCopy = Object.assign({}, state);
      stateCopy.playlists = action.payload;
      stateCopy.showFromPlaylists = true;
      stateCopy.showFromSongs = false;
      return stateCopy;
    }
    case types.SHOW_FROM_SONGS: {
      stateCopy = Object.assign({}, state);
      stateCopy.fromSongs = action.payload;
      stateCopy.showFromPlaylists = false;
      stateCopy.showFromSongs = true;
      stateCopy.showToSongs = true;
      return stateCopy;
    }
    default:
      return state;
  }
}
