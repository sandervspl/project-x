// dependencies
import React, { PropTypes } from 'react';

// components
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// style
import './Header.styl';

const Header = ({ children, icon, iconColor, href, hrefText, textAlign, size, className }) => {
  let containerClassName = 'header';

  switch (textAlign) {
    case 'left': containerClassName += ' header--ta-left'; break;
    case 'center': containerClassName += ' header--ta-center'; break;
    case 'right': containerClassName += ' header--ta-right'; break;
    default: break;
  }

  if (href) {
    containerClassName += ' header--with-link';
  }
  containerClassName += ` ${className}`;

  const h3ClassName = `header-text header-text--fs-${size}`;

  return (
    <div className={containerClassName}>
      {do { /* eslint-disable */
        if (icon) {
          <TextWithIcon icon={icon} iconColor={iconColor}>
            <h3 className={h3ClassName}>{ children }</h3>
          </TextWithIcon>;
        } else {
          <h3 className={h3ClassName}>{ children }</h3>;
        }
        /* eslint-enable */
      }}

      { href && <a href="#" className="header-btn">{ hrefText }</a> }
    </div>
  );
};

Header.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  href: PropTypes.string,
  hrefText: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  size: PropTypes.oneOf(['small', 'regular', 'big']),
};

Header.defaultProps = {
  iconColor: 'black',
  textAlign: 'left',
  size: 'regular',
};

export default Header;
