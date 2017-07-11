// dependencies
import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';

// components
import ButtonSideIcon from 'components/ButtonSideIcon/ButtonSideIcon';

// style
import './DateButton.styl';

class DateButton extends Component {
  static propTypes = {
    date: PropTypes.shape({}).isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      updated: false,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { type } = this.props;

    if (nextProps.date[type] !== this.props.date[type]) {
      this.setState({
        updated: true,
      });
    }

    if (nextState.updated && !this.state.updated) {
      setTimeout(() => {
        this.setState({
          updated: false,
        });
      }, 1100);
    }
  }

  onClick = (e) => {
    e.preventDefault();

    const { onClick, type } = this.props;
    onClick(type);
  };

  render() {
    const { date, type } = this.props;
    const { updated } = this.state;

    let clsName = 'date-btn';
    if (updated) clsName += ' date-updated';

    return (
      <ButtonSideIcon
        color="purple-light"
        inverted
        textAlign="left"
        className={clsName}
        onClick={e => this.onClick(e)}
        iconLeft="calendar"
        iconColorLeft="purple"
        iconRight="chevron-right"
        iconColorRight="purple-light"
        iconContainerWidth="15"
      >
        <div className="date-btn__inner">
          <span className="day-text"> { dateFormat(date[type], 'dddd') } </span>
          <span className="date-text"> { dateFormat(date[type], 'mmmm dS') } </span>
        </div>
      </ButtonSideIcon>
    );
  }
}

export default DateButton;
