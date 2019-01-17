'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('isomorphic-fetch');
require('es6-promise').polyfill();

var youTubeFetch = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(playlist_id, api_key, page_token) {
    var base_url, config, url, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('page token = ', page_token);
            _context.prev = 1;
            base_url = 'https://www.googleapis.com/youtube/v3';
            config = {
              method: 'GET',
              mode: 'cors'
            };
            url = void 0;

            if (page_token) {
              url = base_url + '/playlistItems?&part=snippet&playlistId=' + playlist_id + '&pageToken=' + page_token + '&maxResults=50&key=' + api_key;
            } else {
              url = base_url + '/playlistItems?&part=snippet&playlistId=' + playlist_id + '&maxResults=50&key=' + api_key;
            }

            _context.next = 8;
            return fetch(url, config);

          case 8:
            result = _context.sent;

            if (!(result.status != 200)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', Promise.reject(result.error));

          case 11:
            _context.next = 13;
            return result.json();

          case 13:
            return _context.abrupt('return', _context.sent);

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](1);

            console.error('youTubeFetch:error', _context.t0);
            throw new Error(_context.t0);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 16]]);
  }));

  return function youTubeFetch(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = youTubeFetch;