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
        <div className="inner">
          <span className="small-text">{'Already have an account?'}</span>
          <MiniButton text="sign in" action={openSigninModal} />
        </div>
      );
      break;

    case 'signup':
      content = (
        <div className="inner">
          <span className="small-text">{'Need an account?'}</span>
          <MiniButton text="sign up" action={openRegisterModal} />
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
  setModalOpen: PropTypes.func.isRequired,
};

export default FooterAuth;
