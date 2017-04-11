// dependencies
import React, { PropTypes } from 'react';
import { Modal, Input, Button, Divider } from 'semantic-ui-react';

// components
import SmallServiceLoginBtn from '../../../../components/SmallServiceLoginBtn/SmallServiceLoginBtn';
import FooterAuth from '../../../../components/FooterAuth/FooterAuth';

// style
import './LoginModal.styl';

const LoginModal = ({ open, close }) => {
  function generateLoginButtons() {
    const services = [
      'facebook',
      'twitter',
      'google',
    ];

    const btnArray = [];
    services.forEach((service, index) => {
      btnArray.push(<SmallServiceLoginBtn key={index} serviceName={service} />);
    });

    return btnArray;
  }

  return (
    <Modal size="small" open={open} onClose={close} className="px-modal login-modal">
      <Modal.Content>
        <Modal.Description>
          <Input type="text" placeholder="Email or Username" />
          <Input type="password" placeholder="Password" />
          <Button color="purple" className="signin-btn big-btn" fluid disabled>sign in</Button>
          <p className="help-login">
            <a href="#">{'help, I can\'t sign in.'}</a>
          </p>
          <Divider horizontal>or</Divider>
          <h4>log in with</h4>
          <div className="login-service-btns">
            { generateLoginButtons() }
          </div>
          <FooterAuth type="signup" />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default LoginModal;
