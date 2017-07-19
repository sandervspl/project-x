// dependencies
import React from 'react';
import { Link } from 'react-router';

// routes
import routes from 'routes/routes';

// components
import ButtonIconLeftTextMiddle from 'components/ButtonIconLeftTextMiddle/ButtonIconLeftTextMiddle';

// style
// import './EmailSignUpButton.styl';

const EmailSignUpButton = () => (
  <Link to={routes.register.create}>
    <ButtonIconLeftTextMiddle
      icon="envelope"
      iconColor="purple"
      color="purple"
      inverted
      className="email-signup-btn"
    >
      Sign up with Email
    </ButtonIconLeftTextMiddle>
  </Link>
);

export default EmailSignUpButton;
