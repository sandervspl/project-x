/* eslint-disable */
// dependencies
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

// components
import Icon from 'components/Icon/Icon';

// routes
import routes from 'routes/routes';

// style
import './PartyNav.styl';

class PartyNav extends Component {
  static propTypes = {
    partyId: PropTypes.number,
  };

  state = {
    activePage: 0,
  };

  navList = () => {
    const LOCATION = routes.party.party.home.replace(':id', this.props.partyId);

    return [
      {
        href: `${LOCATION}`,
        icon: 'clock-o',
      },
      {
        href: `${LOCATION}/playlist`,
        icon: 'list',
      },
      {
        href: `${LOCATION}/attendees`,
        icon: 'users',
      },
      {
        href: `${LOCATION}/settings`,
        icon: 'cog',
      },
    ];
  };

  handleClick = (activePage) => {
    this.setState({ activePage });
  };

  render() {
    const { activePage } = this.state;
    const nav = this.navList();

    return (
      <div className="party-nav__container">
        {nav.map((item, index) => (
          <Link
            key={item.icon}
            to={item.href}
            onClick={() => this.handleClick(index)}
          >
            <Icon
              name={item.icon}
              size="big"
              className={cx(
                  'party-nav__icon',
                  { 'party-nav__icon--active': index === activePage },
                )}
              noSpacing
            />
          </Link>
        ))}
      </div>
    );
  }
}

export default PartyNav;
