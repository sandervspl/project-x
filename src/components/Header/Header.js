// dependencies
import React, { PropTypes } from 'react';

// components
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// style
import './Header.styl';

const Header = ({ children, icon, iconColor, href, hrefText, textAlign, size }) => {
  let className = 'header';

  switch (textAlign) {
    case 'left': className += ' header--ta-left'; break;
    case 'center': className += ' header--ta-center'; break;
    case 'right': className += ' header--ta-right'; break;
    default: break;
  }

  if (href) {
    className += ' header--with-link';
  }

  const h3ClassName = `inline header-text header-text--fs-${size}`;

  return (
    <div className={className}>
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
  children: PropTypes.string,
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
