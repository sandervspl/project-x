// dependencies
import React, { PropTypes } from 'react';
import { Modal, Input, Button } from 'semantic-ui-react';

// style
import './LoginModal.styl';

const LoginModal = ({ open, close }) => (
  <Modal size="small" open={open} onClose={close} className="login-modal">
    <Modal.Content>
      <Modal.Description>
        <Input type="text" placeholder="Email or Username" />
        <Input type="password" placeholder="Password" />
        <Button color="purple" className="signin-btn" disabled>sign in</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default LoginModal;
