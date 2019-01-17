'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    _this.update_valid = true;
    _this.timer_id;

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(SearchBar, [{
    key: 'handleChange',
    value: function handleChange(e) {
      var _this2 = this;

      var value = e.target.value;

      var regex = new RegExp(value);

      if (this.props.next_page_token == null) {
        var filtered_video_list = this.props.master_video_list.filter(function (v) {
          return value == '' || regex.test(v.snippet.title);
        });

        if (this.update_valid) {
          this.update_valid = false;
          this.props.handleUpdateFilteredVideos(filtered_video_list, value != '');
        } else {
          if (this.timer_id) {
            clearTimeout(this.timer_id);
          }
          this.timer_id = setTimeout(function () {
            _this2.update_valid = true;
            _this2.props.handleUpdateFilteredVideos(filtered_video_list, value != '');
          }, 200);
        }
      } else {
        var _props = this.props,
            api_key = _props.api_key,
            playlist_id = _props.playlist_id;

        if (this.update_valid) {
          this.update_valid = false;
          (0, _utils.youTubeFetchFiltered)(playlist_id, api_key, value).then(function (filtered_video_list) {
            _this2.props.handleUpdateFilteredVideos(filtered_video_list, value != '');
          });
        } else {
          if (this.timer_id) {
            clearTimeout(this.timer_id);
          }
          this.timer_id = setTimeout(function () {
            _this2.update_valid = true;
            (0, _utils.youTubeFetchFiltered)(playlist_id, api_key, value).then(function (filtered_video_list) {
              _this2.props.handleUpdateFilteredVideos(filtered_video_list, value != '');
            });
          }, 200);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'react-youtube-channel-search-bar-container' },
        _react2.default.createElement('input', {
          className: 'form-control',
          placeholder: 'Filter By Video Title',
          onChange: this.handleChange
        })
      );
    }
  }]);

  return SearchBar;
}(_react2.default.Component);

exports.default = SearchBar;