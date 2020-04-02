import React from 'react';
import renderer from 'react-test-renderer';
import { createSerializer } from 'jest-emotion';
import * as emotion from '@xstyled/emotion';
import { ThemeProvider } from '@xstyled/emotion';
import Badge from '../Badge';
import theme from '../../../theme';

expect.addSnapshotSerializer(createSerializer(emotion));

it('Badge renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Badge>1</Badge>
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
