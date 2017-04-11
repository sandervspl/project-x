/* eslint-disable */
'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  styleLoader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
  styles: {
    "mixins": true,

    "core": true,
    "icons": true,

    "larger": true,
    "path": true,
  }
};
