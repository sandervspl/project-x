// dependencies
import React, { PropTypes } from 'react';
import cx from 'classnames';

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
  const iconComponent = (
    <Icon
      key="-twi-icon-component"
      name={icon}
      color={iconColor}
      className="twi-icon"
      size={iconSize}
    />
  );

  const textComponent = (
    <span
      key="-twi-text-component"
      className={cx('twi-text', textClassName)}
    >
      {children}
    </span>
  );

  return (
    <div className={`${containerClassName}`}>
      { iconPosition === 'left' ? [iconComponent, textComponent] : [textComponent, iconComponent] }
    </div>
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
  containerClassName: '',
  textClassName: '',
  icon: 'music',
  iconColor: 'black',
  iconPosition: 'left',
  iconSize: 'big',
};

export default TextWithIcon;
