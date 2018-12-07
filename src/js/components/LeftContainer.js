import React from 'react';
import { connect } from 'react-redux';
import PlaylistList from './PlaylistList';
import * as actions from '../actions/actions';
import SpotifyEntry from './SpotifyEntry';
import SongsList from './SongsList';


const mapStateToProps = store => ({
  showFromPlaylists: store.leftContainerReducer.showFromPlaylists,
  playlists: store.leftContainerReducer.playlists,
  fromSongs: store.leftContainerReducer.fromSongs,
  showFromSongs: store.leftContainerReducer.showFromSongs,
});

const mapDispatchToProps = dispatch => ({
  loginToSpotify: () => {
    dispatch(actions.loginToSpotify());
  },
  getSpotifyPlaylistSongs: (playlistId) => {
    dispatch(actions.getSpotifyPlaylistSongs(playlistId));
  },
});


const LeftContainer = (props) => {
  const { showFromPlaylists, loginToSpotify, playlists, fromSongs, showFromSongs, getSpotifyPlaylistSongs } = props;
  let content = <SpotifyEntry loginToSpotify={loginToSpotify} />;

  if (showFromPlaylists) {
    content = <PlaylistList getSpotifyPlaylistSongs={getSpotifyPlaylistSongs} playlists={playlists} />;
  } else if (showFromSongs) {
    content = <SongsList fromSongs={fromSongs} />;
  }

  return (
    <div className="floatLeft divPadding">
      {content}
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
