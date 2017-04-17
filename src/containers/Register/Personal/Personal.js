// dependencies
import React from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';

// style
import './Personal.styl';

const Register = () => {
  function onChange() {
    console.log('a');
  }

  return (
    <section className="register-form personal">
      <h1>You</h1>
      <p className="register-about">
        Tell us a bit about yourself!
      </p>
      <Form>
        <Form.Field className="photo-upload">
          <label htmlFor="file-upload" className="custom-file-upload">
            <div className="upload up-icon">
              <Icon name="plus" />
            </div>
            <div className="upload up-text">Photo</div>
          </label>
          <input id="file-upload" type="file" />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Input placeholder="First name" icon="user" className="fullname" onChange={onChange} />
          <Form.Input placeholder="Last name" icon="user" className="fullname" onChange={onChange} />
        </Form.Group>
        <Form.Input placeholder="Username" icon="user circle" className="username" onChange={onChange} />
        <Button color="purple" className="big-btn" fluid disabled>Create</Button>
      </Form>
    </section>
  );
};

export default Register;
