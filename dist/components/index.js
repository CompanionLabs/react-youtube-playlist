'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _videoList = require('./video-list');

var _videoList2 = _interopRequireDefault(_videoList);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var is_mounted = false;

var YouTubePlaylist = function (_React$Component) {
  _inherits(YouTubePlaylist, _React$Component);

  function YouTubePlaylist() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, YouTubePlaylist);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YouTubePlaylist.__proto__ || Object.getPrototypeOf(YouTubePlaylist)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      fetching: true,
      initial_video_list: [],
      video_id: '',
      next_page_token: '',
      total_results_count: 0,
      iframe_width: 640,
      iframe_height: 390,
      small_screen: window.innerWidth < 980
    }, _this.handleResize = function (e) {
      if (is_mounted) {
        if (e.target.innerWidth > 980 && _this.state.small_screen) {
          _this.setState({ small_screen: false });
        } else if (e.target.innerWidth <= 980 && !_this.state.small_screen) {
          _this.setState({ small_screen: true });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YouTubePlaylist, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      is_mounted = true;
      var _props = this.props,
          api_key = _props.api_key,
          playlist_id = _props.playlist_id,
          width = _props.width,
          height = _props.height;

      if (!api_key) {
        throw new Error('An API key must be provided');
      }
      if (!playlist_id) {
        throw 'A playlist ID must be provided';
      } else {
        (0, _utils.youTubeFetch)(playlist_id, api_key).then(function (video_data) {
          if (is_mounted) {
            var video_id = void 0,
                channel_id = '';
            var items = video_data.items,
                nextPageToken = video_data.nextPageToken,
                pageInfo = video_data.pageInfo;

            if (items.length > 0) {
              video_id = items[0].snippet.resourceId.videoId;
            }
            _this2.setState({
              initial_video_list: items,
              video_id: video_id,
              fetching: false,
              next_page_token: nextPageToken,
              total_results_count: pageInfo.totalResults
            });
          }
        }).catch(function (e) {
          console.error('componentDidMount:err', e);
        });
      }

      this.setState({ iframe_height: height ? (0, _utils.getHeight)(height) : this.state.height });

      (0, _jquery2.default)(window).on('resize', this.handleResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      is_mounted = false;
      (0, _jquery2.default)(window).off('resize', this.handleResize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          frame_border = _props2.frame_border,
          iframe_style = _props2.iframe_style,
          container_class = _props2.container_class,
          iframe_container_class = _props2.iframe_container_class,
          video_list_container_class = _props2.video_list_container_class,
          show_thumbnails = _props2.show_thumbnails,
          scrolling = _props2.scrolling;


      var video_list_style = this.state.small_screen ? { minHeight: '20px' } : { height: this.state.iframe_height + 'px' };

      return _react2.default.createElement(
        'div',
        {
          id: 'react-youtube-channel-container',
          className: '' + (container_class || ''),
          style: { width: width }
        },
        _react2.default.createElement(
          'div',
          {
            id: 'outer-video-list-container',
            className: '' + (video_list_container_class || ''),
            style: video_list_style
          },
          !this.state.fetching && this.state.video_id && _react2.default.createElement(_videoList2.default, {
            initial_video_list: this.state.initial_video_list,
            current_video_id: this.state.video_id,
            handleChange: function handleChange(v) {
              _this3.setState({ video_id: v });
            },
            show_thumbnails: show_thumbnails,
            small_screen: this.state.small_screen,
            total_results_count: this.state.total_results_count,
            api_key: this.props.api_key,
            playlist_id: this.props.playlist_id,
            next_page_token: this.state.next_page_token,
            height: height
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'iframe-container ' + (iframe_container_class || '') },
          this.props.playlist_id && this.state.video_id && _react2.default.createElement('iframe', {
            id: 'player',
            height: this.state.iframe_height,
            frameBorder: frame_border || '0',
            src: 'https://www.youtube.com/embed/' + this.state.video_id + '?enablejsapi=1?playlist=' + this.props.playlist_id,
            style: { width: '100%' },
            allowFullScreen: true,
            scrolling: '' + ('yes' || scrolling)
          })
        )
      );
    }
  }]);

  return YouTubePlaylist;
}(_react2.default.Component);

YouTubePlaylist.propTypes = {
  api_key: _propTypes2.default.string.isRequired,
  playlist_id: _propTypes2.default.string,
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  frame_border: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  iframe_style: _propTypes2.default.object,
  show_thumbnails: _propTypes2.default.bool,
  iframe_container_class: _propTypes2.default.string,
  video_list_container_class: _propTypes2.default.string,
  scrolling: _propTypes2.default.oneOf(['yes', 'no', 'auto'])
};

exports.default = YouTubePlaylist;