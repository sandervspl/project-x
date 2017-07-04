// dependencies
import React, { Component, PropTypes } from 'react';
import dateFormat from 'dateformat';

// components
import ButtonSideIcon from 'components/ButtonSideIcon/ButtonSideIcon';

// style
import './DateButton.styl';

class DateButton extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
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
    if (nextProps.date !== this.props.date) {
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
    const { date } = this.props;
    const { updated } = this.state;

    let classname = 'date-btn';
    if (updated) classname += ' date-updated';

    return (
      <ButtonSideIcon
        color="purple-light"
        inverted
        textAlign="left"
        className={classname}
        onClick={e => this.onClick(e)}
        iconLeft="calendar"
        iconColorLeft="purple"
        iconRight="chevron-right"
        iconColorRight="purple-light"
        iconContainerWidth="15"
      >
        <div className="date-btn__inner">
          <span className="day-text"> { dateFormat(date, 'dddd') } </span>
          <span className="date-text"> { dateFormat(date, 'mmmm dS') } </span>
        </div>
      </ButtonSideIcon>
    );
  }
}

export default DateButton;
