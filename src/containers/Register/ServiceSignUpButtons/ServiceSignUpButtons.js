// dependencies
import React from 'react';

// components
import ButtonIconLeftTextMiddle from 'components/ButtonIconLeftTextMiddle/ButtonIconLeftTextMiddle';

// style
// import './ServiceSignUpButtons.styl';

const ServiceSignUpButtons = () => {
  function generateSignupButtons() {
    const services = [
      'facebook',
      'twitter',
      'google',
    ];

    return services.map(service => (
      <ButtonIconLeftTextMiddle key={service} icon={service} className={`btn-signup ${service}`}>
        { `Sign up with ${service}` }
      </ButtonIconLeftTextMiddle>
      ),
    );
  }

  return (
    <div className="service-signup-buttons">
      { generateSignupButtons() }
    </div>
  );
};

export default ServiceSignUpButtons;
