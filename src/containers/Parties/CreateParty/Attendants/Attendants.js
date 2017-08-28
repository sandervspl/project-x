// dependencies
import React, { PropTypes, Component } from 'react';
import { Modal as SemanticModal } from 'semantic-ui-react';
import { connect } from 'react-redux';

// components
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import FormInput from 'components/FormInput/FormInput';

import { API_HOST } from 'cfg';
import { user } from 'helpers/customProps';

// style
// import './Attendants.styl';

function mapStateToProps(state) {
  return {
    getUser: state.app.user.getUser,
  };
}

class Attendants extends Component {
  static propTypes = {
    getUser: PropTypes.shape({
      user: user.propTypes,
    }),
  };

  state = {
    friendsList: [],
    searched: false,
  };

  searchFriends = async (_, query) => {
    if (!query) {
      this.setState({
        friendsList: [],
        searched: false,
      });

      return;
    }

    const result = await fetch(`${API_HOST}/users/${query}`);
    let users = await result.json();

    users = users.data.filter(_user => _user.id !== this.props.getUser.user.id);

    this.setState({
      friendsList: users,
      searched: true,
    });
  };

  render() {
    const { friendsList, searched } = this.state;

    return (
      <div className="full-width">
        <Header icon="group" iconColor="purple-medium">
          Attendants
        </Header>

        <SemanticModal
          trigger={(
            <Button
              color="purple"
              inverted
              icon="user-plus"
              iconColor="purple-medium"
              textAlign="left"
            >
              Invite friend
            </Button>
          )}
        >
          <SemanticModal.Header>
            Invite your friends
          </SemanticModal.Header>
          <SemanticModal.Content>
            <SemanticModal.Description>
              <FormInput
                type="text"
                placeholder="Friend's name"
                onChange={this.searchFriends}
                fluid
              />

              {(friendsList.length === 0 && searched) && <p>Could not find friends.</p>}

              {friendsList.length > 0 &&
                <ul>
                  {friendsList.map(friend => (
                    <li key={friend.id}>
                      {friend.firstName} {friend.lastName}
                    </li>
                  ))}
                </ul>
              }
            </SemanticModal.Description>
          </SemanticModal.Content>
        </SemanticModal>
      </div>
    );
  }
}

Attendants.propTypes = {
  addAttendant: PropTypes.func.isRequired,
  removeAttendant: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Attendants);
