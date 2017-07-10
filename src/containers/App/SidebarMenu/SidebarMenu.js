// dependencies
import React, { Component, PropTypes } from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// components
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Authorized from 'components/Authorized/Authorized';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// actions
import { unauthorize } from 'ducks/modules/user/getUser';

// routes
import routes from 'routes/routes';

// style
import './SidebarMenu.styl';

// sidebar items
const ItemTop = ({ toggleOpen }) => (
  <Menu.Item name="home" className="item-top">
    <div className="item-left">
      <Link to="#" className="item-text-language">ENGLISH</Link>
    </div>
    <div className="item-right" onClick={toggleOpen}>
      <TextWithIcon
        icon="close"
        iconColor="black"
        iconPosition="right"
      >
        <span className="close">CLOSE</span>
      </TextWithIcon>
    </div>
  </Menu.Item>
);
ItemTop.propTypes = {
  toggleOpen: PropTypes.func,
};

const ItemLogOut = ({ logout }) => {
  function handleClick() {
    // TODO: add modal: are you sure? Y/N
    logout();
  }

  return (
    <Menu.Item name="logout" onClick={handleClick}>
      <TextWithIcon icon="sign-out" iconColor="purple">Logout</TextWithIcon>
    </Menu.Item>
  );
};
ItemLogOut.propTypes = {
  logout: PropTypes.func,
};

const ItemProfile = ({ onClick }) => (
  <Link to={routes.user.profile} onClick={onClick}>
    <Menu.Item name="home">
      <TextWithIcon icon="home" iconColor="purple">Profile</TextWithIcon>
    </Menu.Item>
  </Link>
);
ItemProfile.propTypes = {
  onClick: PropTypes.func,
};

// sidebar
class SidebarMenu extends Component {
  static propTypes = {
    children: PropTypes.element,
    unauthorize: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { children } = this.props;
    const { open } = this.state;

    return (
      <div className="page-fill" id="app" role="app">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="slide along"
            width="wide"
            visible={open}
            icon="labeled"
            vertical
            inverted
            className="sidebar-inner"
          >
            <ItemTop toggleOpen={this.toggleOpen} />

            <Authorized>
              <ItemProfile onClick={this.toggleOpen} />
            </Authorized>

            <Authorized>
              <ItemLogOut logout={this.props.unauthorize} />
            </Authorized>

          </Sidebar>
          <Sidebar.Pusher>
            <NavigationBar toggleSidebar={this.toggleOpen} />
            {children}
          </Sidebar.Pusher>
          <div className="pushable-overlay" />
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default connect(null, { unauthorize })(SidebarMenu);
