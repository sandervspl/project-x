// dependencies
import React, { Component } from 'react';

export default WrappedComponent => class FileUpload extends Component {
  state = {
    loading: false,
    file: {},
    imagePreviewUrl: '',
  };

  handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadstart = () => {
      this.setState({
        loading: true,
        file: {},
        imagePreviewUrl: '',
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

  render() {
    return (
      <WrappedComponent
        {...this.props}
        {...this.state}
        handleImageChange={this.handleImageChange}
      />
    );
  }
};
