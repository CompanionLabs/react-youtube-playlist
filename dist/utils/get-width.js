'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var getWidth = function getWidth(width) {
  var video_list_node = document.getElementById('video-list-container');
  var video_list_width = video_list_node.clientWidth;

  if (width.endsWith('%')) {
    width = parseInt(width.substr(0, width.length - 1));
    var container_node = document.getElementById('react-youtube-channel-container');
    var parent_node = container_node.parentNode;
    var container_width = parent_node.clientWidth;

    return parseInt((container_width - video_list_width) * (width / 100));
  } else {
    return width - video_list_width;
  }
};

exports.default = getWidth;