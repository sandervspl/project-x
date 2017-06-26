// dependencies
import React, { PropTypes } from 'react';

// components
import Icon from 'components/Icon/Icon';

// style
import './TextWithIcon.styl';

const TextWithIcon = ({
  children,
  containerClassName,
  icon,
  iconColor,
  iconPosition,
  iconSize,
  textClassName,
}) => {
  const iconComponent = <Icon name={icon} color={iconColor} className="twi-icon" size={iconSize} />;

  return (
    <span className={`twi-basic ${containerClassName}`}>
      { iconPosition === 'left' && iconComponent }

      <span className={`twi-text ${textClassName}`}>{ children }</span>

      { iconPosition === 'right' && iconComponent }
    </span>
  );
};

TextWithIcon.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconSize: PropTypes.string,
  containerClassName: PropTypes.string,
  textClassName: PropTypes.string,
};

TextWithIcon.defaultProps = {
  containerClassName: 'textwithicon-container',
  textClassName: 'textwithicon-text',
  icon: 'music',
  iconColor: 'black',
  iconPosition: 'left',
  iconSize: 'big',
};

export default TextWithIcon;
