// dependencies
import React, { PropTypes } from 'react';

// components
import SidebarMenu from './SidebarMenu';

const App = ({ children }) => (
  <div className="page-fill">
    <SidebarMenu>
      {children}
    </SidebarMenu>
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
