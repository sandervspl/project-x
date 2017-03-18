// dependencies
import React, { Component } from 'react';
// style
import './Background.styl';

/* eslint-disable */
const BackgroundVideos = [
  require('../../assets/videos/bg_1_720p.mp4'),
  require('../../assets/videos/bg_2_720p.mp4'),
  require('../../assets/videos/bg_3_720p.mp4'),
];
/* eslint-enable */

class Background extends Component {
  static setVideo() {
    const randVideo = Math.floor(Math.random() * BackgroundVideos.length);
    return BackgroundVideos[randVideo];
  }

  /*
   * Apple handheld devices do not allow videos to autoplay.
   * Videos can sometimes go full screen as well.
   * Show still image instead of video if is apple device.
   */
  static isIOS() {
    const iDevices = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ];

    if (typeof navigator.platform !== 'undefined') {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()) {
          return true;
        }
      }
    }

    return false;
  }

  constructor(props) {
    super(props);
    this.videoURI = Background.setVideo();
    this.isIOS = Background.isIOS();
  }

  renderBackground = () => {
    const showVideo = !this.isIOS;

    if (showVideo) {
      return (
        <video
          preload="yes"
          autoPlay="true"
          loop="true"
          type="video/mp4"
          src={this.videoURI}
          className="background-video"
        />
      );
    }
    return (
      <div className="background-img" />
    );
  };

  render() {
    return (
      this.renderBackground()
    );
  }
}

export default Background;
