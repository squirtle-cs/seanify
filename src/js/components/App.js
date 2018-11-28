import React from 'react';
import List from './List';
import Form from './Form';
import connectLink from '../../assets/connect_spotify.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      playlists: [],
    };

    this.fetchLogin = this.fetchLogin.bind(this);
  }

  fetchLogin() {
    fetch('localhost:3000/spotify/login')
      .then((data) => {
        this.setState({ loggedIn: true, playlist: data });
      });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div></div>
      );
    }
    return (
      <div>
        <h2>Migrate your Spotify Playlist to YouTube:</h2>
        {/* <a href="localhost:3000/spotify/login"><img src={connectLink} alt="connect with Spotify"/></a> */}
        {/* may need binding: */}
        <img src={connectLink} onClick={this.fetchLogin} className="imgLink" alt="login to Spotify"></img>
      </div>
    );
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