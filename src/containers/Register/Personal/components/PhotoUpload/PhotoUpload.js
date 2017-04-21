// dependencies
import React, { Component } from 'react';
import { Form, Icon, Loader } from 'semantic-ui-react';
import { isEmpty } from 'validator';

// style
import './PhotoUpload.styl';

class PhotoUpload extends Component {
  state = {
    loading: false,
    file: '',
    imagePreviewUrl: '',
  };

  handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadstart = () => {
      this.setState({
        loading: true,
      });
    };

    reader.onloadend = () => {
      this.setState({
        loading: false,
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  renderPreviewImage = () => {
    const { imagePreviewUrl, loading } = this.state;

    if (isEmpty(imagePreviewUrl)) {
      if (loading) {
        return (
          <div className="upload-photo-container">
            <Loader
              className="purple-loader"
              loaded={false}
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

  render() {
    const { loading } = this.state;
    return (
      <Form.Field className="photo-upload">
        <label htmlFor="file-upload" className={`custom-file-upload ${loading && 'loading'}`}>
          { this.renderPreviewImage() }
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={this.handleImageChange}
          disabled={loading}
        />
      </Form.Field>
    );
  }
}

export default PhotoUpload;
