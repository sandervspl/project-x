// dependencies
import React from 'react';
import { Link } from 'react-router';

// components
import ButtonIconLeftTextMiddle from 'components/ButtonIconLeftTextMiddle/ButtonIconLeftTextMiddle';

// style
import './EmailSignUpButton.styl';

const EmailSignUpButton = () => (
  <Link to="/register">
    <ButtonIconLeftTextMiddle icon="envelope" className="btn-basic purple" id="email-signup-btn">
      Sign up with Email
    </ButtonIconLeftTextMiddle>
  </Link>
);

export default EmailSignUpButton;
