// dependencies
import React, { PropTypes } from 'react';

// components
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// style
import './Button.styl';

const Button = ({
  children,
  color,
  inverted,
  icon,
  iconSize,
  iconColor,
  textAlign,
  fontSize,
  disabled,
}) => {
  let className = `px-btn px-btn--${color} px-btn__fs--${fontSize} px-btn__ta--${textAlign}`;
  if (inverted) className += ' px-btn--inverted';

  return (
    <button className={className} disabled={disabled}>
      <TextWithIcon icon={icon} iconSize={iconSize} iconColor={iconColor}>
        { children }
      </TextWithIcon>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  color: PropTypes.oneOf(['black', 'purple']),
  inverted: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  iconColor: PropTypes.string,
  fontSize: PropTypes.oneOf(['small', 'normal', 'big']),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  color: 'black',
  inverted: false,
  icon: null,
  iconSize: 'normal',
  fontSize: 'small',
  textAlign: 'center',
  disabled: false,
};

export default Button;
