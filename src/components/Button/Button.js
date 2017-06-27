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
  icon,
  iconSize,
  iconColor,
  textAlign,
  fontSize,
  disabled,
  loading,
  onClick,
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

  let className = `px-btn px-btn--${color} px-btn__fs--${fontSize} px-btn__ta--${textAlign}`;
  if (inverted) className += ' px-btn--inverted';
  if (loading) className += ' px-btn--loading';

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      { renderContent() }
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
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  color: 'black',
  inverted: false,
  icon: null,
  iconSize: 'normal',
  fontSize: 'small',
  textAlign: 'center',
  disabled: false,
  loading: false,
  onClick: null,
};

export default Button;
