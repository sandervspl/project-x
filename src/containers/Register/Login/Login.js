// dependencies
import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

// components
import PolicyText from '../../../components/PolicyText/PolicyText';

// style
import './Login.styl';

class Login extends Component {
  onChange = () => {
    const email = document.querySelector('.email > .input > input').value;
    const password = document.querySelector('.password > .input > input').value;
    const password2 = document.querySelector('.password-verify > .input > input').value;
    const btn = document.querySelector('#next-btn');

    if (email !== '' && password !== '' && password2 !== '' && btn.classList.contains('disabled')) {
      btn.classList.remove('disabled');
    } else if ((email === '' || password === '' || password2 === '') && !btn.classList.contains('disabled')) {
      btn.classList.add('disabled');
    }
  };

  onBlur = () => {
    const password = document.querySelector('.password > .input > input').value;
    const password2 = document.querySelector('.password-verify > .input > input').value;

    if (password === '' || password2 === '') return;

    if (password !== password2) {
      const btn = document.querySelector('#next-btn');

      if (!btn.classList.contains('disabled')) {
        btn.classList.add('disabled');
      }
    }
  };

  onClick = () => {
    const forms = document.querySelectorAll('.register-form');
    forms.forEach((form) => {
      form.classList.add('show-personal');
    });
  };

  render() {
    return (
      <section className="register-form login">
        <h1>New account</h1>
        <p className="register-about">
          Registering an account at Project-x lets you create your own unique party environment.
          Invite your friends blabla etc.
        </p>
        <Form>
          <Form.Field>
            <Form.Input type="email" placeholder="Email address" icon="mail" className="email" onChange={this.onChange} />
          </Form.Field>
          <Form.Input type="password" placeholder="Password" icon="lock" className="password" onChange={this.onChange} onBlur={this.onBlur} />
          <Form.Input type="password" placeholder="Verify password" icon="lock" className="password-verify" onChange={this.onChange} onBlur={this.onBlur} />
          <Button color="purple" className="big-btn disabled" id="next-btn" onClick={this.onClick} fluid>Next</Button>
        </Form>
        <PolicyText />
      </section>
    );
  }
}

export default Login;
