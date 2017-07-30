// dependencies
import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';
import cx from 'classnames';

// components
import ButtonSideIcon from 'components/ButtonSideIcon/ButtonSideIcon';

// style
import './DateButton.styl';

class DateButton extends Component {
  static propTypes = {
    dates: PropTypes.shape({}).isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  state = {
    updated: false,
  };

  componentWillUpdate(nextProps, nextState) {
    const { type } = this.props;

    if (nextProps.dates[type] !== this.props.dates[type]) {
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
    const { dates, type } = this.props;
    const { updated } = this.state;

    const clsName = cx('date-btn', { 'date-updated': updated });

    return (
      <ButtonSideIcon
        color="purple-light"
        inverted
        textAlign="left"
        className={clsName}
        onClick={this.onClick}
        iconLeft="calendar"
        iconColorLeft="purple"
        iconRight="chevron-right"
        iconColorRight="purple-light"
        iconContainerWidth="15"
      >
        <div className="date-btn__inner">
          <span className="day-text"> {dateFormat(dates[type], 'dddd')} </span>
          <span className="date-text"> {dateFormat(dates[type], 'mmmm dS')} </span>
        </div>
      </ButtonSideIcon>
    );
  }
}

export default DateButton;
