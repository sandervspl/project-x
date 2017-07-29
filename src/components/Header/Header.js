// dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { capitalize } from 'lodash';
import cx from 'classnames';

// components
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// style
import './Header.styl';

const Header = ({ children, icon, iconColor, href, hrefText, textAlign, size, className }) => {
  const capitalizeString = (child) => {
    if (typeof child === 'string') {
      return capitalize(child);
    }

    return child;
  };

  const containerBlock = 'header';
  const containerClsName = cx(
    containerBlock,
    {
      [`${containerBlock}--with-link`]: href,
    },
    `${containerBlock}--ta-${textAlign}`,
    className,
  );

  const textBlock = 'header-text';
  const textClsName = cx(
    textBlock,
    `${textBlock}--fs-${size}`,
  );

  return (
    <div className={containerClsName}>
      {do { /* eslint-disable */
        if (icon) {
          <TextWithIcon icon={icon} iconColor={iconColor}>
            <h3 className={textClsName}>{ capitalizeString(children) }</h3>
          </TextWithIcon>;
        } else {
          <h3 className={textClsName}>{ capitalizeString(children) }</h3>;
        }
        /* eslint-enable */
      }}

      { href && <Link to="#" className="header-btn">{ hrefText }</Link> }
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
  href: null,
};

export default Header;
