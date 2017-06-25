// dependencies
import React, { PropTypes } from 'react';
import { Modal } from 'semantic-ui-react';

// components
import FooterAuth from 'components/FooterAuth/FooterAuth';
import RegisterModalContent from './RegisterModalContent/RegisterModalContent';

// style
import './RegisterModal.styl';

const RegisterModal = ({ isOpen, toggleModal }) => (
  <Modal size="small" open={isOpen} onClose={() => toggleModal('signup', false)} closeIcon="close" className="px-modal register-modal">
    <Modal.Header>
      Sign up to Project-X to create parties and connect with your friends
    </Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <RegisterModalContent />
      </Modal.Description>
    </Modal.Content>
    <FooterAuth type="signin" setModalOpen={toggleModal} />
  </Modal>
);

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default RegisterModal;
