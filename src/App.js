import React from 'react';
import ReactDOM from 'react-dom';
import connectLink from './assets/connect_spotify.png';

const App = () => {
  return (
    <div>
      <p>Hello World!!</p>
      <a href="localhost:3000/spotify-login"><img src={connectLink} alt="login to Spotify"/></a>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
