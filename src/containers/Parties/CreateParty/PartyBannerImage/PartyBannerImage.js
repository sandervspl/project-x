// dependencies
import React, { PropTypes } from 'react';
import { isEmpty } from 'validator';

// components
import Loader from 'components/Loader/Loader';
import Icon from 'components/Icon/Icon';

// hoc
import withFileUpload from 'hoc/withFileUpload';

// style
import './PartyBannerImage.styl';

// FIXME: disable until we can use FILE prop
// eslint-disable-next-line
const PartyBannerImage = ({ loading, file, imagePreviewUrl, handleImageChange }) => {
  const bgImg = !isEmpty(imagePreviewUrl)
    ? { backgroundImage: `url(${imagePreviewUrl})` }
    : {};

  return (
    <div className="party-banner-image-container" style={bgImg}>
      { isEmpty(imagePreviewUrl) && <Icon name="image" className="pbi__icon" /> }

      <label
        htmlFor="file-upload"
        className={`custom-file-upload ${loading ? 'loading' : ''} ${imagePreviewUrl ? 'pbi--dim' : ''}`}
      >
        <div className="upload-image-container">
          {
            loading &&
            <Loader
              color="purple"
              size="big"
              active
            />
          }
          <Icon name="camera" color="white" disabled={loading} />
        </div>
      </label>

      <input
        id="file-upload"
        type="file"
        onChange={handleImageChange}
        disabled={loading}
        name="partybanner"
      />
    </div>
  );
};

PartyBannerImage.propTypes = {
  loading: PropTypes.bool,
  file: PropTypes.string,
  imagePreviewUrl: PropTypes.string,
  handleImageChange: PropTypes.func,
};

export default withFileUpload(PartyBannerImage);
