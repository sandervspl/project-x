// dependencies
import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';

// style
import './Personal.styl';

// components
import FullNameGroup from './components/FullNameGroup';
import Username from './components/Username/Username';

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

  shouldButtonEnable = () => {
    const button = document.querySelector('#create-btn');
    const { fullNameValid, usernameValid } = this.state;

    if (!button) return;

    if (button.classList.contains('disabled')) {
      if (fullNameValid && usernameValid) {
        button.classList.remove('disabled');
      }
    } else if (!fullNameValid || !usernameValid) {
      if (!button.classList.contains('disabled')) {
        button.classList.add('disabled');
      }
    }
  };

  render() {
    this.shouldButtonEnable();

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
          <Button
            color="purple"
            className="big-btn"
            id="create-btn"
            fluid
            disabled
          >
            Create
          </Button>
        </Form>
      </section>
    );
  }
}

export default Register;
