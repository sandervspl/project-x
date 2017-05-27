// dependencies
import React from 'react';

// components
import SmallServiceLoginBtn from 'components/SmallServiceLoginBtn/SmallServiceLoginBtn';

// style
import './ServiceLoginButtonGroup.styl';

const ServiceLoginButtonGroup = () => {
  function generateLoginButtons() {
    const services = [
      'facebook',
      'twitter',
      'google',
    ];

    return services.map(service => <SmallServiceLoginBtn key={service} serviceName={service} />);
  }

  return (
    <div className="login-service-button-group">
      { generateLoginButtons() }
    </div>
  );
};

export default ServiceLoginButtonGroup;
