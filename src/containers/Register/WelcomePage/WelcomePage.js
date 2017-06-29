// dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

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
      className="big-btn"
      id="get-started-btn"
      fluid
      color="purple"
      basic
      onClick={handleClick}
    >
      Get started
      <Icon name="chevron right" />
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
