// dependencies
import React, { PropTypes } from 'react';

// components
import MiniButton from 'components/MiniButton/MiniButton';

// routes
import routes from 'routes/routes';

// style
import './FooterAuth.styl';

const SignIn = () => (
  <div className="inner-auth">
    <span className="auth-text">{'Already have an account?'}</span>
    <MiniButton href={routes.login.login}>
      Sign in
    </MiniButton>
  </div>
);

const SignUp = () => (
  <div className="inner-auth">
    <span className="auth-text">{'Need an account?'}</span>
    <MiniButton href={routes.register.register}>
      Sign up
    </MiniButton>
  </div>
);

const FooterAuth = ({ type }) => (
  <div className="auth-footer">
    {type === 'signin' ? <SignIn /> : <SignUp />}
  </div>
);


FooterAuth.propTypes = {
  type: PropTypes.oneOf(['signup', 'signin']).isRequired,
};

export default FooterAuth;
