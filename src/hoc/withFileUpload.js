// dependencies
import React, { Component } from 'react';

function withFileUpload(WrappedComponent) {
  return class FileUpload extends Component {
    static propTypes = {};

    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        file: '',
        imagePreviewUrl: '',
      };
    }

    handleImageChange = (e) => {
      e.preventDefault();

      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadstart = () => {
        this.setState({
          loading: true,
          file: '',
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
}

export default withFileUpload;
