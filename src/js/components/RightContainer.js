import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import YouTubeEntry from './YouTubeEntry';
import ToSongsList from './ToSongsList';


const mapStateToProps = store => ({
  fromSongs: store.leftContainerReducer.fromSongs,
  showToSongs: store.leftContainerReducer.showToSongs,
  toSongs: store.rightContainerReducer.toSongs,
});

const mapDispatchToProps = dispatch => ({
  loginToYouTube: () => {
    dispatch(actions.loginToYouTube());
  },
  getYouTubeSong: (song) => {
    dispatch(actions.getYouTubeSong(song));
  },
});


const RightContainer = (props) => {
  const { loginToYouTube, fromSongs, showToSongs, getYouTubeSong, toSongs } = props;
  let content = <YouTubeEntry loginToYouTube={loginToYouTube} />;

  if (showToSongs) {
    content = <ToSongsList fromSongs={fromSongs} toSongs={toSongs} getYouTubeSong={getYouTubeSong} />;
  }

  return (
    <div className="floatLeft divPadding">
      {content}
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);