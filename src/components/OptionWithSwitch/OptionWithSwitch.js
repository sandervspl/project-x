// dependencies
import React, { Component, PropTypes } from 'react';

// components
import Switch from 'components/Switch/Switch';

// style
import './OptionWithSwitch.styl';

class OptionWithSwitch extends Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.string,
    isOn: PropTypes.bool,
  };

  static defaultProps = {
    isOn: false,
  };

  handleOnClick = () => {
    const { tag, onChange, isOn } = this.props;
    const newValue = !isOn;

    onChange(tag, newValue);
  }

  render() {
    const { children, isOn } = this.props;

    return (
      <div className="option-with-switch-container">
        <div>{ children }</div>
        <Switch isOn={isOn} onClick={this.handleOnClick} />
      </div>
    );
  }
}

export default OptionWithSwitch;
