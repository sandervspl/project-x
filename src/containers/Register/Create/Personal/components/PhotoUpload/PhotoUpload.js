// dependencies
import React, { PropTypes } from 'react';
import { Form, Icon, Loader } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

// hoc
import withFileUpload from 'hoc/withFileUpload';

// actions
import { updateUserValues } from 'ducks/modules/user/create';

// style
import './PhotoUpload.styl';

// FIXME: disable until we can use FILE prop
// eslint-disable-next-line
const PhotoUpload = ({ loading, file, imagePreviewUrl, handleImageChange, updateUserValues }) => {
  const renderPreviewImage = () => {
    if (isEmpty(imagePreviewUrl)) {
      if (loading) {
        return (
          <div className="upload-photo-container">
            <Loader
              className="purple-loader"
              size="big"
              active
            />
          </div>
        );
      }

      return (
        <div className="upload-icon-container">
          <div className="upload up-icon">
            <Icon name="plus" />
          </div>
          <div className="upload up-text">Photo</div>
        </div>
      );
    }

    const style = {
      backgroundImage: `url(${imagePreviewUrl})`,
    };

    return <div className="upload-photo-container" style={style} />;
  };

  const onChange = (e) => {
    handleImageChange(e);
    updateUserValues('avatar', e.target.files[0]);
  };

  return (
    <Form.Field className="photo-upload">
      <label htmlFor="file-upload" className={`custom-file-upload ${loading ? 'loading' : ''}`}>
        { renderPreviewImage() }
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={onChange}
        disabled={loading}
        name="avatar"
      />
    </Form.Field>
  );
};

PhotoUpload.propTypes = {
  loading: PropTypes.bool,
  file: PropTypes.shape({}),
  imagePreviewUrl: PropTypes.string,
  handleImageChange: PropTypes.func,
};

export default connect(null, { updateUserValues })(withFileUpload(PhotoUpload));
