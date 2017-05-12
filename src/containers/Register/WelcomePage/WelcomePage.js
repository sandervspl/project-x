// dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

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

const WelcomePage = ({ user }) => (
  <div id="welcome-page" className="page-fill">
    <div className="inner">
      <div id="portrait-container" />
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
