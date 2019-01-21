import React from 'react';
import YouTubePlaylist from '../../../dist';
import '../../../dist/styles.scss';

import './styles.scss';

const App = () => {
  return (
    <YouTubePlaylist
      api_key="AIzaSyBRKbR9hS9678OzzL0Ju7XjLZPISRpKnwY"
      playlist_id="PLCP9GgzdebSIUq_GmmRU_OdmDhSLBC5lP"
      show_thumbnails
      width="100%"
      height="100%"
    />
  )
}

export default App;
