// dependencies
import React, { PropTypes } from 'react';

// components
import MiniButton from '../MiniButton/MiniButton';

// style
import './FooterAuth.styl';

const FooterAuth = ({ type }) => {
  let content = '<div/>';

  switch (type) {
    case 'signin':
      content = (
        <div className="inner">
          <span>{'Already have an account?'}</span>
          <MiniButton text="sign in" href="#" />
        </div>
      );
      break;

    case 'signup':
      content = (
        <div className="inner">
          <span>{'Need an account?'}</span>
          <MiniButton text="sign up" href="#" />
        </div>
      );
      break;

    default:
      throw Error('Invalid FooterAuth Type. Only types "signup" and "signin" are available.');
  }

  return (
    <div className="auth-footer">
      {content}
    </div>
  );
};

FooterAuth.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FooterAuth;
