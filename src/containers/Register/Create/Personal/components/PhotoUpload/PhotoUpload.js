// dependencies
import React, { PropTypes } from 'react';
import { Form, Icon, Loader } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import cx from 'classnames';

// hoc
import withFileUpload from 'hoc/withFileUpload';

// actions
import { updateUserValues } from 'ducks/modules/user/create';

// style
import './PhotoUpload.styl';

const PhotoUpload = (props) => {
  const renderPreviewImage = () => {
    if (isEmpty(props.imagePreviewUrl)) {
      if (props.loading) {
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
          <div className="upload up-text">
            Photo
          </div>
        </div>
      );
    }

    const style = {
      backgroundImage: `url(${props.imagePreviewUrl})`,
    };

    return <div className="upload-photo-container" style={style} />;
  };

  const onChange = (e) => {
    props.handleImageChange(e);
    props.updateUserValues({ avatar: e.target.files[0] });
  };

  return (
    <Form.Field className="photo-upload">
      <label
        htmlFor="file-upload"
        className={cx('custom-file-upload', { loading: props.loading })}
      >
        { renderPreviewImage() }
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={onChange}
        disabled={props.loading}
        name="avatar"
      />
    </Form.Field>
  );
};

PhotoUpload.propTypes = {
  updateUserValues: PropTypes.func,
  loading: PropTypes.bool,
  imagePreviewUrl: PropTypes.string,
  handleImageChange: PropTypes.func,
};

export default connect(null, { updateUserValues })(withFileUpload(PhotoUpload));
