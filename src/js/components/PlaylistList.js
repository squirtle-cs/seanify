import React from 'react';
import { connect } from 'react-redux';

class PlaylistList extends React.Component {
  constructor(props) {
    super(props);
  }

  // const mapStateToProps = state => {
  //   return { playlists: state.playlists };
  // };

  // const ConnectedList = ({ articles }) => (
  //   <ul className='list-group list-group-flush'>
  //     {playlists.map(playlist => (
  //       <li className='list-group-item' key={playlist.id}>
  //         {playlist.playlistName}
  //       </li>
  //     ))}
  //   </ul>
  // );

  // const List = connect(mapStateToProps)(ConnectedList);
}

export default PlaylistList;
