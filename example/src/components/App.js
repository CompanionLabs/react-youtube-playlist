import React from 'react';
import YouTubePlaylist from 'react-youtube-playlist';
import '../../../dist/styles.scss';

import './styles.scss';

const App = () => {
  return (
    <YouTubePlaylist
      api_key="AIzaSyAgqLIxOST5fML1Ywg_xW6F5ttvnjSqjqQ"
      playlist_id="PL64BwQcJEEVImdziHEAlXzb5Zhzs1KNKT"
      show_thumbnails
      width="800px"
      height="600px"
    />
  )
}

export default App;
