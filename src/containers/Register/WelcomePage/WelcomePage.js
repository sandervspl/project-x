// dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { isEmpty } from 'lodash';

// components
import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import PageFill from 'components/PageFill/PageFill';

// assets
import defaultImg from 'assets/images/avatars/avatar_default.png';

// route paths
import routes from 'routes/routes';

// style
import './WelcomePage.styl';

// generate context path
const pathToAvatars = require.context(process.env.REACT_APP_IMAGE_UPLOAD_PATH);

const GetStartedButton = () => {
  const handleClick = () => {
    browserHistory.push(routes.user.profile);
  };

  return (
    <Button
      className="welcome-page__get-started-btn"
      color="white"
      fontSize="big"
      fontColor="purple"
      onClick={handleClick}
    >
      GET STARTED
      <Icon
        name="chevron-right"
        size="big"
        color="purple"
        className="welcome-page__get-started-icon"
      />
    </Button>
  );
};

// TODO: fix avatar img src
const WelcomePage = ({ user }) => {
  const img = !isEmpty(user.avatar) ? pathToAvatars(`./${user.avatar}`) : defaultImg;

  return (
    <PageFill className="welcome-page" inner={false}>
      <div className="welcome-page__inner">
        <div
          className="welcome-page__portrait-container"
          style={{ backgroundImage: `url(${img})` }}
        />
        <h1>Welcome</h1>
        <h3>{user.username}</h3>
        <GetStartedButton />
      </div>
    </PageFill>
  );
};

WelcomePage.propTypes = {
  user: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  user: state.app.user.getUser.user,
});

export default connect(mapStateToProps, null)(WelcomePage);
