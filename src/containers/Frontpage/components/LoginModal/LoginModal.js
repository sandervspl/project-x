// dependencies
import React, { PropTypes } from 'react';
import { Modal, Form, Input, Button, Divider } from 'semantic-ui-react';

// components
import SmallServiceLoginBtn from '../../../../components/SmallServiceLoginBtn/SmallServiceLoginBtn';
import FooterAuth from '../../../../components/FooterAuth/FooterAuth';

// style
import './LoginModal.styl';

const LoginModal = ({ isOpen, setModalOpen }) => {
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

  function onChange() {
    const username = document.querySelector('#px-username-field > input').value;
    const password = document.querySelector('#px-password-field > input').value;
    const btn = document.querySelector('#px-signin-btn');

    if (username !== '' && password !== '' && btn.classList.contains('disabled')) {
      btn.classList.remove('disabled');
    } else if ((username === '' || password === '') && !btn.classList.contains('disabled')) {
      btn.classList.add('disabled');
    }
  }

  return (
    <Modal size="small" open={isOpen} onClose={() => setModalOpen('signin', false)} closeIcon="close" className="px-modal login-modal">
      <Modal.Header>Sign in to start your party</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Input type="text" placeholder="Email or Username" id="px-username-field" onChange={onChange} />
            <Input type="password" placeholder="Password" id="px-password-field" onChange={onChange} />
            <Button color="purple" className="signin-btn big-btn" id="px-signin-btn" fluid disabled>Sign in</Button>
          </Form>
          <p className="help-login">
            <a href="#">{'Help, I can\'t sign in.'}</a>
          </p>
          <Divider horizontal>or</Divider>
          <h4>log in with</h4>
          <div className="login-service-btns">
            { generateLoginButtons() }
          </div>
          <FooterAuth type="signup" setModalOpen={setModalOpen} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default LoginModal;
