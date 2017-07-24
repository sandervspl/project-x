// dependencies
import React, { PropTypes } from 'react';
import { size } from 'lodash';

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
  flex,
  error,
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

  const block = 'px-btn';
  const classlist = [
    block,
    `${block}--${color}`,
    `${block}__fs--${fontSize}`,
    `${block}__ta--${textAlign}`,
  ];

  if (inverted) classlist.push(`${block}--inverted`);
  if (loading) classlist.push(`${block}--loading`);
  if (transparent) classlist.push(`${block}--transparent`);
  if (fontColor) classlist.push(`${block}__fc--${fontColor}`);
  if (flex) classlist.push(`${block}--flex`);
  if (error) classlist.push(`${block}--error`);
  if (size(className) > 0) classlist.push(className);

  const clsName = classlist.join(' ');

  return (
    <button className={clsName} disabled={disabled} onClick={onClick}>
      { renderContent() }
    </button>
  );
};

Button.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  color: PropTypes.oneOf(['black', 'purple', 'white', 'purple-light', 'facebook', 'twitter', 'google']),
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
  flex: PropTypes.bool,
  error: PropTypes.bool,
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
  flex: false,
  error: false,
  className: '',
};

export default Button;
