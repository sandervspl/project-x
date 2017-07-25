// dependencies
import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';

// assets
import defaultImg from 'assets/images/avatars/avatar_default.png';

// style
import './Avatar.styl';

// generate context path
const pathToAvatars = require.context(process.env.REACT_APP_IMAGE_UPLOAD_PATH);

const Avatar = ({ avatar }) => {
  const img = !isEmpty(avatar) ? pathToAvatars(`./${avatar}`) : defaultImg;

  return (
    <div
      className="profile-avatar-container"
      style={{ backgroundImage: `url(${img})` }}
    />
  );
};

Avatar.propTypes = {
  avatar: PropTypes.string,
};

Avatar.defaultProps = {
  avatar: defaultImg,
};

export default Avatar;
