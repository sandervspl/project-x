// dependencies
import React, { Component } from 'react';
import { Form, Icon } from 'semantic-ui-react';

// style
import './Personal.styl';

// components
import FullNameGroup from './components/FullNameGroup';
import Username from './components/Username/Username';
import CreateButton from './components/CreateButton';

class Register extends Component {
  state = {
    fullNameValid: null,
    usernameValid: null,
  };

  setFullNameValid = (fullNameValid) => {
    this.setState({ fullNameValid });
  }

  setUsernameValid = (usernameValid) => {
    this.setState({ usernameValid });
  }

  render() {
    return (
      <section className="register-form personal">
        <h1>You</h1>
        <p className="register-about">
          Tell us a bit about yourself!
        </p>
        <Form>
          <Form.Field className="photo-upload">
            <label htmlFor="file-upload" className="custom-file-upload">
              <div className="upload up-icon">
                <Icon name="plus" />
              </div>
              <div className="upload up-text">Photo</div>
            </label>
            <input id="file-upload" type="file" />
          </Form.Field>
          <FullNameGroup setValid={this.setFullNameValid} />
          <Username
            setValid={this.setUsernameValid}
            isValid={this.state.usernameValid}
          />
          <CreateButton
            fullNameValid={this.state.fullNameValid}
            usernameValid={this.state.usernameValid}
          />
        </Form>
      </section>
    );
  }
}

export default Register;
