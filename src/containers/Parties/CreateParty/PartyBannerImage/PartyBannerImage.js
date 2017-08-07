// dependencies
import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

// actions
import { updatePartyValue } from 'ducks/modules/party/createParty';

// components
import Loader from 'components/Loader/Loader';
import Icon from 'components/Icon/Icon';

// hoc
import withFileUpload from 'hoc/withFileUpload';

// style
import './PartyBannerImage.styl';

const PartyBannerImage = ({
  loading,
  imagePreviewUrl,
  handleImageChange,
  updatePartyValue: updateStore,
}) => {
  const bgImg = !isEmpty(imagePreviewUrl)
    ? { backgroundImage: `url(${imagePreviewUrl})` }
    : {};

  const onChange = (e) => {
    handleImageChange(e);
    updateStore({ banner: e.target.files[0] });
  };

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
        onChange={onChange}
        disabled={loading}
        name="partybanner"
      />
    </div>
  );
};

PartyBannerImage.propTypes = {
  loading: PropTypes.bool,
  file: PropTypes.shape({}),
  imagePreviewUrl: PropTypes.string,
  handleImageChange: PropTypes.func,
  updatePartyValue: PropTypes.func,
};

export default connect(null, { updatePartyValue })(withFileUpload(PartyBannerImage));
