import React from 'react';
import renderer from 'react-test-renderer';
import { createSerializer } from 'jest-emotion';
import * as emotion from '@xstyled/emotion';
import { ColorModeProvider, ThemeProvider } from '@xstyled/emotion';
import Header from '../Header';
import theme from '../../theme';

expect.addSnapshotSerializer(createSerializer(emotion));

it('Header renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <Header />
        </ColorModeProvider>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
