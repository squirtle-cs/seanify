import * as types from '../constants/action-types';

const initialState = {
  toLoggedIn: false,
  toSongs: [],
};

export default function (state = initialState, action) {
  let stateCopy;
  switch (action.type) {
    case types.SAVE_YOUTUBE_SONG: {
      stateCopy = Object.assign({}, state);
      const newSongs = stateCopy.toSongs.slice();
      newSongs.push(action.payload);
      stateCopy.toSongs = newSongs;
      console.log('new songs ', newSongs);
      return stateCopy;
    }
    default:
      return state;
  }
}
