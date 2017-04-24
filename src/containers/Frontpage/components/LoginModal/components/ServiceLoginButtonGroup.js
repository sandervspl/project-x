// dependencies
import React from 'react';

// components
import SmallServiceLoginBtn from 'components/SmallServiceLoginBtn/SmallServiceLoginBtn';

const ServiceLoginButtonGroup = () => {
  function generateLoginButtons() {
    const services = [
      'facebook',
      'twitter',
      'google',
    ];

    const btnArray = [];
    services.forEach((service, index) => {
      btnArray.push(<SmallServiceLoginBtn key={index} serviceName={service} />);
    });

    return btnArray;
  }

  return (
    <div className="login-service-btns">
      { generateLoginButtons() }
    </div>
  );
};

export default ServiceLoginButtonGroup;
