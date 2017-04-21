// dependencies
import React, { Component, PropTypes } from 'react';
import MobileDetect from 'mobile-detect';

// style
import './Background.styl';

class Background extends Component {
  static propTypes = {
    hasLoaded: PropTypes.func.isRequired,
  };

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

    this.isMobileDevice = this.isAMobileDevice();
  }

  componentWillMount() {
    if (this.isMobileDevice) {
      this.imageURI = this.setImage();
    } else {
      this.videoURI = this.setVideo();
    }
  }

  // the img element is only there so we can load an image into memory
  // when it has been loaded, remove it from the DOM
  // we do this because we can't tell if a CSS 'background-image' is done loading
  // we need background-image for 'background-size: cover'
  onLoad = (e) => {
    const el = e.target;
    el.parentElement.removeChild(el);

    this.props.hasLoaded();
  };

  setVideo = () => {
    const randVideo = Math.floor(Math.random() * this.backgroundVideos.length);
    return this.backgroundVideos[randVideo];
  };

  setImage = () => {
    const randImage = Math.floor(Math.random() * this.backgroundImages.length);
    return this.backgroundImages[randImage];
  };

  /*
   * Don't let mobile devices download a movie
   * and load an image instead
   */
  isAMobileDevice = () => {
    const md = new MobileDetect(window.navigator.userAgent);

    if (md.phone() !== null ||
        md.tablet() !== null ||
        md.isPhoneSized()) {
      return true;
    }

    return false;
  };

  renderBackground = () => {
    const showVideo = !this.isMobileDevice;
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
      <div className="background img" style={style}>
        <img src={this.imageURI} alt="bg-loader" id="bg-loader" onLoad={this.onLoad} />
      </div>
    );
  };

  render() {
    return this.renderBackground();
  }
}

export default Background;
