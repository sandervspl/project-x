/* eslint-disable */
// Link.react-test.js
import React from 'react';
import FooterAuth from '../FooterAuth/FooterAuth';
import renderer from 'react-test-renderer';

test('FooterAuth should correctly render with type "signin"', () => {
  const component = renderer.create(
    <FooterAuth type="signin" />
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
