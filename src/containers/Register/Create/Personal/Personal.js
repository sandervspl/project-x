// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import { setPersonalFormValidation } from 'ducks/modules/user/create';

// components
import AboutPage from 'components/AboutPage/AboutPage';
import TitleWithLogo from 'components/TitleWithLogo/TitleWithLogo';
import FullNameGroup from './components/FullNameGroup';
import UsernameInput from './components/UsernameInput/UsernameInput';
import CreateButton from './components/CreateButton';
import PhotoUpload from './components/PhotoUpload/PhotoUpload';

// style
import './Personal.styl';

class Personal extends Component {
  static propTypes = {
    setPersonalFormValidation: PropTypes.func,
    create: PropTypes.shape({
      personalFormValid: PropTypes.bool,
      page: PropTypes.number,
    }),
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      fullNameValid: null,
      usernameValid: null,
    };
  }

  componentDidUpdate() {
    const { fullNameValid, usernameValid } = this.state;
    const { personalFormValid } = this.props.create;
    const isValid = fullNameValid && usernameValid;

    if (isValid && !personalFormValid) {
      this.props.setPersonalFormValidation(true);
    } else if (!isValid && personalFormValid) {
      this.props.setPersonalFormValidation(false);
    }
  }

  setFullNameValid = (fullNameValid) => {
    this.setState({ fullNameValid });
  };

  setUsernameValid = (usernameValid) => {
    this.setState({ usernameValid });
  };

  render() {
    const { onChange } = this.props;
    const { page } = this.props.create;
    const isPageTwo = page === 2;

    return (
      <section className={`register-form login ${isPageTwo ? 'show-personal' : ''}`}>
        {
          isPageTwo &&
            <div>
              <TitleWithLogo> You </TitleWithLogo>

              <AboutPage> Tell us a bit about yourself! </AboutPage>

              <PhotoUpload />

              <FullNameGroup
                setValid={this.setFullNameValid}
                fullNameValid={this.state.fullNameValid}
                onChange={onChange}
              />

              <UsernameInput
                validateUsername={this.setUsernameValid}
                usernameValid={this.state.usernameValid}
                onChange={onChange}
              />

              <CreateButton />
            </div>
        }
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    create: state.app.user.userCreate,
  };
}

export default connect(mapStateToProps, { setPersonalFormValidation })(Personal);
