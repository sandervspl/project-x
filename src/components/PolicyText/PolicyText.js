// dependencies
import React from 'react';
import { Link } from 'react-router';

// style
import './PolicyText.styl';

const PolicyText = () => (
  <span className="small-text policy-text">
    By signing up, you agree to our <Link to="#">Terms</Link> and <Link to="#">Privacy Policy</Link>.
  </span>
);

export default PolicyText;
