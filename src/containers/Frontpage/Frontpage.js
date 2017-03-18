// dependencies
import React from 'react';

// components
import Background from './components/Background/Background';
import Title from './components/Title/Title';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';

// style
import './Frontpage.styl';

const Frontpage = () => (
  <section className="page-fill">
    <Background />
    <Title />
    <ButtonGroup />
  </section>
);

export default Frontpage;
