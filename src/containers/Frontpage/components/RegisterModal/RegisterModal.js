// dependencies
import React, { PropTypes } from 'react';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router';

// components
import FooterAuth from '../../../../components/FooterAuth/FooterAuth';

// style
import './RegisterModal.styl';

const RegisterModal = ({ isOpen, setModalOpen }) => {
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
    <Modal size="small" open={isOpen} onClose={() => setModalOpen('signup', false)} closeIcon="close" className="px-modal register-modal">
      <Modal.Header>
        Sign up to Project-X to create parties and connect with your friends.
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          { generateSignupButtons() }
          <Divider horizontal>OR</Divider>
          <Link to="/register">
            <button className="btn btn-basic purple">
              <i className="fa fa-envelope" aria-hidden="true" />
              Sign up with Email
            </button>
          </Link>
          <span className="small-text policy-text">
            By signing up, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
          </span>
          <FooterAuth
            type="signin"
            setModalOpen={setModalOpen}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default RegisterModal;