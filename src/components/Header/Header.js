// dependencies
import React, { PropTypes } from 'react';

// components
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// style
import './Header.styl';

const Header = ({ children, icon, iconColor, href, hrefText }) => (
  <div className="header">
    { icon
      ? (
        <TextWithIcon icon={icon} iconColor={iconColor}>
          <h3 className="inline">{ children }</h3>
        </TextWithIcon>
      )
      : <h3 className="inline">{ children }</h3>
    }
    { href && <a href="#" className="header-btn">{ hrefText }</a> }
  </div>
);

Header.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  href: PropTypes.string,
  hrefText: PropTypes.string,
};

Header.defaultProps = {
  iconColor: 'black',
};

export default Header;
