// dependencies
import React, { PropTypes } from 'react';

// components
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// style
import './Header.styl';

const Header = ({ children, icon, iconColor, href, hrefText, textAlign }) => (
  <div className="header" style={{ textAlign }}>
    {do { /* eslint-disable */
      if (icon) {
        <TextWithIcon icon={icon} iconColor={iconColor}>
          <h3 className="inline">{ children }</h3>
        </TextWithIcon>;
      } else {
        <h3 className="inline">{ children }</h3>;
      }
      /* eslint-enable */
    }}

    { href && <a href="#" className="header-btn">{ hrefText }</a> }
  </div>
);

Header.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  href: PropTypes.string,
  hrefText: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
};

Header.defaultProps = {
  iconColor: 'black',
  textAlign: 'left',
};

export default Header;
