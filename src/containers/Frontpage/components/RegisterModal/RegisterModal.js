// dependencies
import React, { PropTypes } from 'react';
import { Modal, Button, Divider } from 'semantic-ui-react';

// components
import FooterAuth from '../../../../components/FooterAuth/FooterAuth';

// style
import './RegisterModal.styl';

const RegisterModal = ({ open, close }) => {
  function generateSignupButtons() {
    const services = [
      'facebook',
      'twitter',
      'google',
    ];

    const btnArray = [];
    services.forEach((service, index) => {
      btnArray.push(
        <Button
          key={index}
          fluid
          className={`btn btn-signup ${service}`}
        >
          <i className={`fa fa-${service}`} aria-hidden="true" />
          {`Sign up with ${service}`}
        </Button>,
      );
    });

    return btnArray;
  }

  return (
    <Modal size="small" open={open} onClose={close} className="px-modal register-modal">
      <Modal.Content>
        <Modal.Description>
          { generateSignupButtons() }
          <Divider horizontal>OR</Divider>
          <button fluid className="btn btn-basic purple">
            <i className="fa fa-envelope" aria-hidden="true" />
            Sign up with Email
          </button>
          <span className="small-text policy-text">
            By signing up, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
          </span>
          <FooterAuth type="signin" />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default RegisterModal;
