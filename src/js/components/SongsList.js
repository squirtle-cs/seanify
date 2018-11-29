import React from 'react';

const SongsList = props => {
  const { fromSongs } = props;
  return (
    <div>
      <ul>
        {fromSongs.map(song => (
          <li key={song.songId}>{song.songName}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongsList;
