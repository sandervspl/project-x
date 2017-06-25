// dependencies
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// actions
import * as getUserActions from 'ducks/modules/user/getUser';

const Authorized = ({ children, getUser }) => {
  const { loaded, user } = getUser;
  const authorized = loaded && !_.isEmpty(user);

  if (!authorized) {
    return null;
  }

  return children;
};

Authorized.propTypes = {
  children: PropTypes.element,
  getUser: PropTypes.shape({
    loaded: PropTypes.bool,
    user: PropTypes.shape({}),
  }),
};

function mapStateToProps(state) {
  return {
    getUser: state.app.user.getUser,
  };
}

export default connect(mapStateToProps, getUserActions)(Authorized);
