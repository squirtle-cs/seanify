import React, { Component } from 'react';

class ToSongsList extends Component {
  componentDidMount() {
    const { fromSongs, getYouTubeSong } = this.props
    fromSongs.forEach((songObj) => {
      getYouTubeSong(songObj.songName);
    });
  }

  render() {
    const { toSongs } = this.props;
    console.log(toSongs)
    
    return (
      <div>
        {<ul>
          {toSongs.map((songArray) => {
            // console.log('here')
            <li key={songArray[0].videoId}>{songArray[0].videoName}</li>
          })}
        </ul>}
        ok
      </div>
    );
  }
};

export default ToSongsList;
