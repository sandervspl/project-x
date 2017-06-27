// dependencies
import React, { PropTypes } from 'react';

// components
import Icon from 'components/Icon/Icon';

// style
import './ServiceType.styl';

const ServiceType = ({ serviceType }) => {
  let icon = serviceType;
  if (icon === 'youtube') icon += '-play';

  return (
    <div className="service-type-container">
      <Icon name={icon} color="grey-medium" size="big" />
    </div>
  );
};

ServiceType.propTypes = {
  serviceType: PropTypes.oneOf(['spotify', 'youtube', 'soundcloud', 'question-circle']),
};

ServiceType.defaultProps = {
  serviceType: 'question-circle',
};

export default ServiceType;
