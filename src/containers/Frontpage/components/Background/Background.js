// dependencies
import React, { Component, PropTypes } from 'react';

// style
import './Background.styl';

class Background extends Component {
  static propTypes = {
    hasLoaded: PropTypes.func.isRequired,
  };

  /*
   * Apple handheld devices do not allow videos to autoplay.
   * Videos can sometimes go full screen as well.
   * Show still image instead of video if is apple device.
   * TODO: Check how android phones handle videos
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

    /* eslint-disable */
    this.backgroundVideos = [
      require('../../assets/videos/bg_1_720p.mp4'),
      require('../../assets/videos/bg_2_720p.mp4'),
      require('../../assets/videos/bg_3_720p.mp4'),
    ];

    this.backgroundImages = [
      require('../../assets/images/bg_3.png'),
      require('../../assets/images/bg_4.png'),
      require('../../assets/images/bg_5.png'),
    ];
    /* eslint-enable */
  }

  componentWillMount() {
    this.isIOS = Background.isIOS();

    if (!this.isIOS) {
      this.videoURI = this.setVideo();
    } else {
      this.imageURI = this.setImage();
    }
  }

  componentDidMount() {
    if (this.isIOS) {
      this.props.hasLoaded();
    }
  }

  setVideo() {
    const randVideo = Math.floor(Math.random() * this.backgroundVideos.length);
    return this.backgroundVideos[randVideo];
  }

  setImage() {
    const randImage = Math.floor(Math.random() * this.backgroundImages.length);
    return this.backgroundImages[randImage];
  }

  renderBackground = () => {
    const showVideo = !this.isIOS;
    const { hasLoaded } = this.props;

    // show video on desktop
    if (showVideo) {
      return (
        <video
          preload="auto"
          autoPlay="true"
          loop="true"
          type="video/mp4"
          src={this.videoURI}
          onCanPlayThrough={hasLoaded}
          className="background video"
        />
      );
    }

    // set random background image for mobile
    const style = { backgroundImage: `url(${this.imageURI})` };
    return (
      <div className="background img" style={style} />
    );
  };

  render() {
    return this.renderBackground();
  }
}

export default Background;
