// dependencies
import React, { PropTypes } from 'react';

// components
import MiniButton from '../MiniButton/MiniButton';

// style
import './FooterAuth.styl';

const FooterAuth = ({ type, setModalOpen }) => {
  let content = '<div/>';

  const openSigninModal = function openSigninModal() {
    setModalOpen('signup', false);
    setModalOpen('signin', true);
  };

  const openRegisterModal = function openRegisterModal() {
    setModalOpen('signin', false);
    setModalOpen('signup', true);
  };

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
  setModalOpen: PropTypes.func.isRequired,
};

export default FooterAuth;
