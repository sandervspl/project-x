// dependencies
import React, { PropTypes } from 'react';

// components
import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';

// style
import './ButtonSideIcon.styl';

const ButtonSideIcon = ({
  children,
  color,
  inverted,
  transparent,
  iconLeft,
  iconRight,
  iconSize,
  iconColorLeft,
  iconColorRight,
  iconContainerWidth,
  fontSize,
  fontColor,
  disabled,
  loading,
  onClick,
  className,
}) => (
  <Button
    textAlign="center"
    flex
    color={color}
    inverted={inverted}
    transparent={transparent}
    disabled={disabled}
    fontSize={fontSize}
    fontColor={fontColor}
    loading={loading}
    onClick={onClick}
    className={className}
  >
    { iconLeft && <div style={{ flex: `0 0 ${iconContainerWidth ? `${iconContainerWidth}%` : '10%'}` }}>
      <Icon name={iconLeft} color={iconColorLeft} size={iconSize} className="bsi__icon bsi__icon--start" noSpacing />
    </div> }
    { children }
    { iconRight && <div style={{ flex: `0 0 ${iconContainerWidth ? `${iconContainerWidth}%` : '10%'}` }}>
      <Icon name={iconRight} color={iconColorRight} size={iconSize} className="bsi__icon bsi__icon--end" noSpacing />
    </div> }
  </Button>
);

ButtonSideIcon.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  color: PropTypes.string,
  inverted: PropTypes.bool,
  transparent: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  iconSize: PropTypes.string,
  iconColorLeft: PropTypes.string,
  iconColorRight: PropTypes.string,
  iconContainerWidth: PropTypes.string,
  fontSize: PropTypes.string,
  fontColor: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

ButtonSideIcon.defaultProps = {
  color: 'black',
  inverted: false,
  transparent: false,
  iconLeft: null,
  iconRight: null,
  iconSize: 'normal',
  iconColorLeft: 'black',
  iconColorRight: 'black',
  iconContainerWidth: null,
  fontSize: 'small',
  fontColor: null,
  disabled: false,
  loading: false,
  onClick: null,
  className: '',
};

export default ButtonSideIcon;
