import { PropTypes } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const user = {
  propTypes: PropTypes.shape({
    avatar: PropTypes.shape({}),
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
    passwordRepeat: PropTypes.string,
    username: PropTypes.string,
  }),
};
