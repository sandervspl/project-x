// dependencies
import React, { PropTypes } from 'react';

// components
import MiniButton from 'components/MiniButton/MiniButton';

// routes
import routes from 'routes/routes';

// style
import './FooterAuth.styl';

const FooterAuth = ({ type }) => {
  let content = '<div/>';

  switch (type) {
    case 'signin':
      content = (
        <div className="inner-auth">
          <span className="auth-text">{'Already have an account?'}</span>
          <MiniButton href={routes.login.login}>Sign in</MiniButton>
        </div>
      );
      break;

    case 'signup':
      content = (
        <div className="inner-auth">
          <span className="auth-text">{'Need an account?'}</span>
          <MiniButton href={routes.register.register}>Sign up</MiniButton>
        </div>
      );
      break;

    default:
      break;
  }

  return (
    <div className="auth-footer">
      {content}
    </div>
  );
};

FooterAuth.propTypes = {
  type: PropTypes.oneOf(['signup', 'signin']).isRequired,
};

export default FooterAuth;
