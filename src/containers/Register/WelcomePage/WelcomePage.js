// dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// components
import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';

// assets
import defaultImg from 'assets/images/avatar_default.png';

// route paths
import routes from 'routes/routes';

// style
import './WelcomePage.styl';

const GetStartedButton = () => {
  const handleClick = () => {
    browserHistory.push(routes.user.profile);
  };

  return (
    <Button
      className="get-started-btn"
      color="white"
      fontSize="big"
      fontColor="purple"
      onClick={handleClick}
    >
      GET STARTED
      <Icon name="chevron-right" size="big" color="purple" className="get-started-icon" />
    </Button>
  );
};

// TODO: fix avatar img src
const WelcomePage = ({ user }) => (
  <div id="welcome-page" className="page-fill">
    <div className="inner">
      <div id="portrait-container" style={{ backgroundImage: `url(${defaultImg})` }} />
      <h1>Welcome</h1>
      <h3>{user.username}</h3>
      <GetStartedButton />
    </div>
  </div>
);

WelcomePage.propTypes = {
  user: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  user: state.app.user.getUser.user,
});

export default connect(mapStateToProps, null)(WelcomePage);
