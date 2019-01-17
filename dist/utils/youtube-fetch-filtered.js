'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('isomorphic-fetch');
require('es6-promise').polyfill();

var youTubeFetchFiltered = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(playlist_id, api_key, filter) {
    var base_url, config, url, page_token, finished, filtered_videos, _loop, _ret;

    return _regenerator2.default.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            base_url = 'https://www.googleapis.com/youtube/v3';
            config = {
              method: 'GET',
              mode: 'cors'
            };
            url = void 0, page_token = void 0;
            finished = false;
            filtered_videos = [];
            _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop() {
              var result, result_json, regex;
              return _regenerator2.default.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (page_token) {
                        url = base_url + '/playlistItems?&part=snippet&playlistId=' + playlist_id + '&pageToken=' + page_token + '&maxResults=50&key=' + api_key;
                      } else {
                        url = base_url + '/playlistItems?&part=snippet&playlistId=' + playlist_id + '&maxResults=50&key=' + api_key;
                      }
                      _context.next = 3;
                      return fetch(url, config);

                    case 3:
                      result = _context.sent;

                      if (!(result.status != 200)) {
                        _context.next = 6;
                        break;
                      }

                      return _context.abrupt('return', {
                        v: Promise.reject(result.error)
                      });

                    case 6:
                      _context.next = 8;
                      return result.json();

                    case 8:
                      result_json = _context.sent;

                      page_token = result_json.nextPageToken;
                      if (page_token) {
                        finished = true;
                      }
                      regex = new RegExp('' + filter, 'i');

                      filtered_videos = [].concat(_toConsumableArray(filtered_videos), _toConsumableArray(result_json.items.filter(function (v) {
                        return regex.test(v.snippet.title);
                      })));

                    case 13:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _loop, undefined);
            });

          case 6:
            if (!(!finished && filtered_videos.length < 1000)) {
              _context2.next = 13;
              break;
            }

            return _context2.delegateYield(_loop(), 't0', 8);

          case 8:
            _ret = _context2.t0;

            if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt('return', _ret.v);

          case 11:
            _context2.next = 6;
            break;

          case 13:
            return _context2.abrupt('return', Promise.resolve(filtered_videos));

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function youTubeFetchFiltered(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = youTubeFetchFiltered;