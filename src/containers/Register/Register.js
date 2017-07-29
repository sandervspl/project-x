// dependencies
import React from 'react';
import { Divider } from 'semantic-ui-react';

// components
import PageInner from 'components/PageInner/PageInner';
import PolicyText from 'components/PolicyText/PolicyText';
import TitleWithLogo from 'components/TitleWithLogo/TitleWithLogo';
import FooterAuth from 'components/FooterAuth/FooterAuth';
import ServiceSignUpButtons from './ServiceSignUpButtons/ServiceSignUpButtons';
import EmailSignUpButton from './EmailSignUpButton/EmailSignUpButton';

// style
import './Register.styl';

const RegisterModalContent = () => (
  <PageInner noNav>
    <TitleWithLogo> Sign up for Project-x </TitleWithLogo>

    <ServiceSignUpButtons />

    <Divider horizontal> OR </Divider>

    <EmailSignUpButton />

    <PolicyText />

    <FooterAuth type="signin" />
  </PageInner>
);

export default RegisterModalContent;
