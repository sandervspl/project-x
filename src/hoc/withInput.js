// dependencies
import React, { Component } from 'react';
import { isEmpty } from 'validator';

function withInput(WrappedComponent) {
  return class WithInputHOC extends Component {
    static propTypes = {};

    constructor(props) {
      super(props);

      this.state = {};
    }

    getValueFromEvent = (e, trimmed = false) => {
      if (trimmed) {
        return e.target.value.trim();
      }

      return e.target.value;
    };

    validateInputMinChar = (value, minCharacter) =>
      !isEmpty(value) && value.length >= minCharacter;

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          getValueFromEvent={this.getValueFromEvent}
          validateInputMinChar={this.validateInputMinChar}
        />
      );
    }
  };
}

export default withInput;
