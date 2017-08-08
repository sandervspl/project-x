// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// actions
import { fetchPartyData, STATUS_NO_EXISTS, STATUS_NO_INVITE } from 'ducks/modules/party/activeParty';

// components
import FullscreenLoader from 'components/FullscreenLoader/FullscreenLoader';
import PartyBanner from './PartyBanner/PartyBanner';
import PartyNav from './PartyNav/PartyNav';
import PartyNotInvited from './PartyNotInvited/PartyNotInvited';
import PartyNotExists from './PartyNotExists/PartyNotExists';

// style
import './Party.styl';

function mapStateToProps(state) {
  return {
    activeParty: state.app.party.activeParty,
  };
}

class Party extends Component {
  static propTypes = {
    // eslint-disable-next-line
    children: PropTypes.any,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    activeParty: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
      errorMessage: PropTypes.string,
      party: PropTypes.shape({
        bannerUrl: PropTypes.string,
        title: PropTypes.string,
        code: PropTypes.string,
        id: PropTypes.number,
      }),
    }),
    fetchPartyData: PropTypes.func,
  };

  componentDidMount() {
    const { id: partyId } = this.props.params;

    this.props.fetchPartyData(partyId);
  }

  render() {
    const { children } = this.props;
    const { loading, loaded, errorMessage } = this.props.activeParty;
    const { bannerUrl, title, code: partyCode, id: partyId } = this.props.activeParty.party;

    if (loading) {
      return <FullscreenLoader loaded={loaded} text="Joining the party..." />;
    }

    // if user is not invited, show a not invited page
    if (errorMessage === STATUS_NO_INVITE) {
      return <PartyNotInvited />;
    }

    // if party does not exist, redirect to (404?)
    if (errorMessage === STATUS_NO_EXISTS) {
      return <PartyNotExists />;
    }

    return (
      <div className="party-layout">
        <PartyBanner
          image={bannerUrl}
          title={title}
          code={partyCode}
        />
        <PartyNav partyId={partyId} />
        <div className="party-layout__inner">
          { children }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { fetchPartyData })(withRouter(Party));
