// dependencies
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { user as userProps } from 'helpers/customProps';

const Authorized = ({ children, getUser }) => {
  const { loaded, user } = getUser;
  const authorized = loaded && !isEmpty(user);

  if (!authorized) {
    return null;
  }

  return children;
};

Authorized.propTypes = {
  children: PropTypes.element,
  getUser: PropTypes.shape({
    loaded: PropTypes.bool,
    user: userProps.propTypes,
  }),
};

function mapStateToProps(state) {
  return {
    getUser: state.app.user.getUser,
  };
}

export default connect(mapStateToProps)(Authorized);
