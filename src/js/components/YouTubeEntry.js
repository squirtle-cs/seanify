import React from 'react';
//import connectLink from "../../assets/connect_spotify.png";

const YouTubeEntry = props => {
  const { loginToYouTube } = props;

  return (
    <div>
      <div onClick={loginToYouTube} className="imgLink">
        <a href="/google/login">YouTube Login</a>
      </div>
    </div>
  );
};

export default YouTubeEntry;
