'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var getHeight = function getHeight(height) {
  if (height.endsWith('%')) {
    height = parseInt(height.substr(0, height.length - 1));
    var container_node = document.getElementById('react-youtube-channel-container');
    var parent_node = container_node.parentNode;
    var container_height = parent_node.clientHeight;

    return parseInt(container_height * (height / 100));
  } else {
    return height;
  }
};

exports.default = getHeight;