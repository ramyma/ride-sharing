import React from 'react';
import * as emotion from '@xstyled/emotion';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@xstyled/emotion';
import { createSerializer } from 'jest-emotion';
import Button from '../Button';
import theme from '../../../theme';

expect.addSnapshotSerializer(createSerializer(emotion));

it('Button renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Button>Test</Button>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Button renders with inverse prop correctly', () => {
  const tree = renderer.create(<Button inverse>Test</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Button renders with disabled prop correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Button disabled>Test</Button>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
