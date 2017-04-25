// dependencies
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

// components
import MiniButton from 'components/MiniButton/MiniButton';

// style
import './FooterAuth.styl';

const FooterAuth = ({ type, setModalOpen, redirectURL }) => {
  let content = '<div/>';

  function openSigninModal() {
    if (setModalOpen) {
      setModalOpen('signup', false);
      setModalOpen('signin', true);
    } else if (redirectURL) {
      // redirect to front page login modal
      browserHistory.push(redirectURL);
    }
  }

  function openRegisterModal() {
    setModalOpen('signin', false);
    setModalOpen('signup', true);
  }

  switch (type) {
    case 'signin':
      content = (
        <div className="inner-auth">
          <span className="small-text">{'Already have an account?'}</span>
          <MiniButton action={openSigninModal}>Sign in</MiniButton>
        </div>
      );
      break;

    case 'signup':
      content = (
        <div className="inner-auth">
          <span className="small-text">{'Need an account?'}</span>
          <MiniButton action={openRegisterModal}>Sign up</MiniButton>
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
  setModalOpen: PropTypes.func,
  redirectURL: PropTypes.string,
};

export default FooterAuth;
