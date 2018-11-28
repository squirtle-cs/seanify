import React from 'react';
// import List from './List';
// import Form from './Form';
import Login from './Login';
import PlaylistList from './PlaylistList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      // playlists: []
    };
  }

  render() {
    if (this.state.loggedIn) {
      return <PlaylistList />;
    }
    return <Login loggedIn={this.state} />;
  }
}

export default App;

// spotify/playlist/:id
// use redux thunk;

// each playlist obj will look like this:
// `[
//   {
//     "playlistId": string,
//     "playlistName": string,
//     "playlistUri": string,
//     "ownerName": string,
//     "ownerUri": string,
//     "tracks": number,
//     "imageUri": string,
//   },
// ]`
