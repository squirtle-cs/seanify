import React from 'react';

const PlaylistList = props => {
  const { playlists, getSpotifyPlaylistSongs } = props;
  return (
    <div>
      <ul>
        {playlists.map(playlist => (
          <li onClick={() => getSpotifyPlaylistSongs(playlist.playlistId)} key={playlist.playlistId}>{playlist.playlistName}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistList;
