// dependencies
import React, { Component, PropTypes } from 'react';
import { noop, debounce } from 'lodash';
import sanitizeHtml from 'sanitize-html';

// utils
import { getValueFromEvent, getNameFromEvent } from 'utils/form';

// style
// import './FormEditWrapper.styl';

class FormEditWrapper extends Component {
  static propTypes = {
    // eslint-disable-next-line
    children: PropTypes.any,
    valuePropName: PropTypes.string,
    onChangePropName: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: noop,
    valuePropName: 'value',
    onChangePropName: 'onChange',
  };

  state = {
    value: '',
  };

  onChildChange = (e) => {
    const name = getNameFromEvent(e);
    const newValue = getValueFromEvent(e);

    // Update our component-local state with these changes, so that the child components
    // will re-render with the new values right away
    this.setState({ value: newValue });

    // Because this is debounced, we will only call the passed-in props.onChange
    // once there is a pause in changes
    this.dispatchValues(name, newValue);
  };

  dispatchValues = debounce((name, change) => {
    this.props.onChange(name, sanitizeHtml(change));
  }, 250);

  render() {
    const { value } = this.state;
    const { children, valuePropName, onChangePropName } = this.props;
    const child = React.Children.only(children);

    return React.cloneElement(child, {
      [valuePropName]: value,
      [onChangePropName]: this.onChildChange,
    });
  }
}

export default FormEditWrapper;
