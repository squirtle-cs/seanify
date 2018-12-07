import React from 'react';
// import List from './List';
// import Form from './Form';
import Login from './SpotifyEntry';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';


class App extends React.Component {

  render() {
    return <div>
      <header className="headerBar">
        <h1>Seanify: Playlist Migration App</h1>
      </header>
      <LeftContainer />
      <RightContainer />
    </div>
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
