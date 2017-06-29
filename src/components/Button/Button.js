// dependencies
import React, { PropTypes } from 'react';

// components
import Loader from 'components/Loader/Loader';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// style
import './Button.styl';

const Button = ({
  children,
  color,
  inverted,
  transparent,
  icon,
  iconSize,
  iconColor,
  textAlign,
  fontSize,
  fontColor,
  disabled,
  loading,
  onClick,
  className,
}) => {
  const renderContent = () => {
    if (loading) {
      return <Loader color="purple" size="big" active />;
    }

    if (icon) {
      return (
        <TextWithIcon icon={icon} iconSize={iconSize} iconColor={iconColor}>
          { children }
        </TextWithIcon>
      );
    }

    return children;
  };

  let classname = `px-btn px-btn--${color} px-btn__fs--${fontSize} px-btn__ta--${textAlign} ${className}`;
  if (inverted) classname += ' px-btn--inverted';
  if (loading) classname += ' px-btn--loading';
  if (transparent) classname += ' px-btn--transparent';
  if (fontColor) classname += ` px-btn__fc--${fontColor}`;

  return (
    <button className={classname} disabled={disabled} onClick={onClick}>
      { renderContent() }
    </button>
  );
};

Button.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  color: PropTypes.oneOf(['black', 'purple', 'white']),
  inverted: PropTypes.bool,
  transparent: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  iconColor: PropTypes.string,
  fontSize: PropTypes.oneOf(['small', 'normal', 'big']),
  fontColor: PropTypes.oneOf(['black', 'purple', 'white']),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  color: 'black',
  inverted: false,
  transparent: false,
  icon: null,
  iconSize: 'normal',
  fontSize: 'small',
  fontColor: null,
  textAlign: 'center',
  disabled: false,
  loading: false,
  onClick: null,
  className: '',
};

export default Button;
