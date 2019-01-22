import React from 'react';
import YouTubePlaylist from '../../../dist';
import '../../../dist/styles.scss';

import './styles.scss';

const App = () => {
  return (
    <div className="app-container">
      <YouTubePlaylist
        api_key="AIzaSyBRKbR9hS9678OzzL0Ju7XjLZPISRpKnwY"
        playlist_id="PLCP9GgzdebSIUq_GmmRU_OdmDhSLBC5lP"
        show_thumbnails
        width="100%"
        height="100%"
        onPlay={video => {
          console.info('Video Played!', video);
        }}
      />
    </div>
  )
}

export default App;
