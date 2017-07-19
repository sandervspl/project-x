// dependencies
import React, { PropTypes } from 'react';

// components
import PageFill from 'components/PageFill/PageFill';
import SidebarMenu from './SidebarMenu/SidebarMenu';

const App = ({ children }) => (
  <PageFill inner={false}>
    <SidebarMenu>
      {children}
    </SidebarMenu>
  </PageFill>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
