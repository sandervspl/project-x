// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import { fetchPartyData } from 'ducks/modules/party/activeParty';

// components
import FullscreenLoader from 'components/FullscreenLoader/FullscreenLoader';
import PartyBanner from './PartyBanner/PartyBanner';
import PartyNav from './PartyNav/PartyNav';

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
    const { loading, loaded } = this.props.activeParty;
    const { bannerUrl, title, code: partyCode, id: partyId } = this.props.activeParty.party;

    if (loading) {
      return <FullscreenLoader loaded={loaded} text="Joining the party..." />;
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

export default connect(mapStateToProps, { fetchPartyData })(Party);
