'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('../utils');

var _reactBootstrap = require('react-bootstrap');

var _searchBar = require('./search-bar');

var _searchBar2 = _interopRequireDefault(_searchBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var is_mounted = false;

var VideoList = function (_React$Component) {
  _inherits(VideoList, _React$Component);

  function VideoList(props) {
    _classCallCheck(this, VideoList);

    var _this = _possibleConstructorReturn(this, (VideoList.__proto__ || Object.getPrototypeOf(VideoList)).call(this, props));

    _this.state = {
      master_video_list: _this.props.initial_video_list,
      truncated_list: [],
      filtered_video_list: _this.props.initial_video_list,
      filter_applied: false,
      fetching_page: false,
      next_page_token: _this.props.next_page_token,
      inner_video_list_container_height: _this.props.height ? _this.props.small_screen ? 160 : _this.props.height - 60 : 160
    };

    _this.handleUpdateFilteredVideos = _this.handleUpdateFilteredVideos.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  _createClass(VideoList, [{
    key: 'handleUpdateFilteredVideos',
    value: function handleUpdateFilteredVideos(videos, filter_applied) {
      this.state.master_video_list.forEach(function (v) {
        (0, _jquery2.default)('#' + v.id).trigger('destroy');
      });
      if (is_mounted) {
        this.setState({ filtered_video_list: videos, filter_applied: filter_applied });
      }
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(e) {
      var _this2 = this;

      if (!this.state.fetching_page && this.state.next_page_token != null && !this.state.filter_applied) {
        var _e$target = e.target,
            scrollHeight = _e$target.scrollHeight,
            scrollTop = _e$target.scrollTop;
        var clientHeight = (0, _jquery2.default)('.inner-video-list-container')[0].clientHeight;


        if (scrollHeight - scrollTop < clientHeight + 600) {
          var _props = this.props,
              api_key = _props.api_key,
              playlist_id = _props.playlist_id;

          this.setState({ fetching_page: true });
          (0, _utils.youTubeFetch)(playlist_id, api_key, this.state.next_page_token).then(function (result) {
            if (is_mounted) {
              var master_video_list = _this2.state.master_video_list;

              master_video_list.forEach(function (v) {
                (0, _jquery2.default)('#' + v.id) ? (0, _jquery2.default)('#' + v.id).trigger('destroy') : null;
              });
              _this2.setState({
                next_page_token: result.nextPageToken,
                master_video_list: [].concat(_toConsumableArray(master_video_list), _toConsumableArray(result.items)),
                filtered_video_list: [].concat(_toConsumableArray(master_video_list), _toConsumableArray(result.items)),
                fetching_page: false
              });
            }
          }).catch(function (e) {
            console.log('ERROR IN SCROLL HANDLER : ', e);
          });
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      is_mounted = true;
      (0, _jquery2.default)('.inner-video-list-container').on('scroll', this.handleScroll);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prev_props) {
      if (prev_props.small_screen != this.props.small_screen) {
        this.state.master_video_list.forEach(function (v) {
          (0, _jquery2.default)('#' + v.id).trigger('destroy');
        });

        if (is_mounted) {
          this.setState({
            inner_video_list_container_height: this.props.small_screen ? 160 : this.props.height - 60
          });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      is_mounted = false;
      (0, _jquery2.default)('.inner-video-list-container').off('scroll', this.handleScroll);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          handleChange = _props2.handleChange,
          show_thumbnails = _props2.show_thumbnails,
          current_video_id = _props2.current_video_id;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_searchBar2.default, {
          master_video_list: this.state.master_video_list,
          handleUpdateFilteredVideos: this.handleUpdateFilteredVideos,
          next_page_token: this.state.next_page_token,
          api_key: this.props.api_key,
          playlist_id: this.props.playlist_id
        }),
        _react2.default.createElement(
          'div',
          { className: 'inner-video-list-container' },
          _react2.default.createElement(
            'div',
            {
              className: 'inner-video-list-scroll-area-container',
              style: { height: this.state.inner_video_list_container_height }
            },
            this.state.filtered_video_list.map(function (v) {
              var _ref = v.snippet.thumbnails ? v.snippet.thumbnails.medium : 'http://img.youtube.com/vi/dXo0LextZTU/sddefault.jpg',
                  url = _ref.url;

              var _v$snippet = v.snippet,
                  title = _v$snippet.title,
                  description = _v$snippet.description;
              var videoId = v.snippet.resourceId.videoId;

              return _react2.default.createElement(
                _reactBootstrap.OverlayTrigger,
                {
                  id: v.id + '-overlay-id',
                  trigger: ['hover', 'focus'],
                  placement: (0, _jquery2.default)('body').width() >= 768 ? 'left' : 'top',
                  key: v.id,
                  overlay: _this3.state.truncated_list.find(function (e) {
                    return e == v.id;
                  }) ? _react2.default.createElement(
                    _reactBootstrap.Popover,
                    { id: v.id + '-popover-id' },
                    title
                  ) : _react2.default.createElement(_reactBootstrap.Popover, { id: v.id + '-popover-id', bsClass: 'hidden' })
                },
                _react2.default.createElement(
                  'div',
                  {
                    className: 'video-container',
                    onClick: function onClick() {
                      handleChange(videoId);
                    }
                  },
                  _react2.default.createElement(
                    'div',
                    {
                      id: v.id,
                      className: 'title-container ' + (current_video_id == videoId ? ' current' : '')
                    },
                    show_thumbnails ? _react2.default.createElement('img', { src: url }) : null,
                    _react2.default.createElement(
                      'div',
                      { className: 'video-info' },
                      _react2.default.createElement(
                        'span',
                        { className: 'video-info__title' },
                        title
                      ),
                      _react2.default.createElement(
                        'span',
                        { className: 'video-info__description' },
                        description
                      )
                    )
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return VideoList;
}(_react2.default.Component);

exports.default = VideoList;