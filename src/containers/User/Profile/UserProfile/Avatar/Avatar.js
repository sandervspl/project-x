// dependencies
import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';

// assets
import defaultImg from 'assets/images/avatars/avatar_default.png';

// style
import './Avatar.styl';

const Avatar = ({ avatar }) => {
  const img = !isEmpty(avatar) ? avatar : defaultImg;

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
