import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import {
  youTubeFetch,
} from '../utils';
import VideoList from './video-list';

 let is_mounted = false;

class YouTubePlaylist extends React.Component {
  state = {
    fetching : true,
    initial_video_list : [],
    video_id : '',
    next_page_token : '',
    total_results_count : 0,
    playerOpts: {
      width : '100%',
      height : '100%',
      playerVars: {
        autoplay: 0
      }
    }
  }

  onStateChange = (state) => {
    const endOfVideo = state.data === 0;

    if (endOfVideo) {
      const { initial_video_list, video_id } = this.state;
      if (initial_video_list && video_id) {
        let nextIndex = null;

        initial_video_list.forEach((vid, currIndex) => {
          if (vid.snippet.resourceId.videoId === video_id) {
            nextIndex = currIndex === initial_video_list.length - 1
              ? null
              : currIndex + 1;
          }
        });

        if (nextIndex) {
          this.setState({
            video_id: initial_video_list[nextIndex].snippet.resourceId.videoId,
            playerOpts: {
              playerVars: {
                autoplay: 1,
              }
            }
          });
        }
      }
    }
  }

  componentDidMount() {
    is_mounted = true;
    const {api_key, playlist_id, width, height} = this.props;
    if(!api_key) {
      throw new Error('An API key must be provided');
    }
    if(!playlist_id) {
      throw 'A playlist ID must be provided';
    }
    else {
      youTubeFetch(playlist_id, api_key)
      .then(video_data => {
        if (is_mounted) {
          let video_id, channel_id = '';
          const {items, nextPageToken, pageInfo} = video_data;
          if(items.length > 0) {
            video_id = items[0].snippet.resourceId.videoId;
          }
          this.setState({
            initial_video_list : items,
            video_id,
            fetching : false,
            next_page_token : nextPageToken,
            total_results_count : pageInfo.totalResults
          });
        }
      })
      .catch((e) => {
        console.error('componentDidMount:err', e);
      });
    }
  }

  componentWillUnmount() {
    is_mounted = false;
  }

  render() {
    const {
      width,
      height,
      container_class,
      iframe_container_class,
      video_list_container_class,
      show_thumbnails,
      TooltipComp,
      tooltipPlacement,
      tooltipClassName,
    } = this.props;

    const {
      playerOpts,
    } = this.state;

    return (
      <div
        id='react-youtube-channel-container'
        className={`${container_class || ''}`}
        style={{width}}
        >
        <div
          id='outer-video-list-container'
          className={`${video_list_container_class || ''}`}
          >
          {!this.state.fetching &&
          this.state.video_id && (
            <VideoList
              initial_video_list={this.state.initial_video_list}
              current_video_id={this.state.video_id}
              handleChange={v => {this.setState({video_id : v})}}
              show_thumbnails={show_thumbnails}
              small_screen={this.state.small_screen}
              total_results_count={this.state.total_results_count}
              api_key={this.props.api_key}
              playlist_id={this.props.playlist_id}
              next_page_token={this.state.next_page_token}
              height={height}
              TooltipComp={TooltipComp}
              tooltipPlacement={tooltipPlacement}
              tooltipClassName={tooltipClassName}
            />
          )}
        </div>
        <div className={`iframe-container ${iframe_container_class || ''}`}>
          { this.props.playlist_id && this.state.video_id && (
            <YouTube
              id='player'
              containerClassName='youtube-player-container'
              videoId={this.state.video_id}
              onStateChange={this.onStateChange}
              opts={playerOpts}
            />
          )}
        </div>
      </div>
    )
  }
}

YouTubePlaylist.defaultProps = {
  TooltipComp: null,
  tooltipPlacement: 'right',
  tooltipClassName: '',
}

YouTubePlaylist.propTypes = {
  api_key: PropTypes.string.isRequired,
  playlist_id: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  frame_border: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  show_thumbnails: PropTypes.bool,
  iframe_container_class: PropTypes.string,
  video_list_container_class: PropTypes.string,
  scrolling : PropTypes.oneOf(['yes', 'no', 'auto']),
  TooltipComp: PropTypes.any,
  tooltipClassName: PropTypes.string,
  tooltipPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
}

export default YouTubePlaylist;
