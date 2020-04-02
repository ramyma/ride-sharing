import React from 'react';
import renderer from 'react-test-renderer';
import * as emotion from '@xstyled/emotion';
import { ThemeProvider } from '@xstyled/emotion';
import Input from '../Input';
import theme from '../../../theme';
import { createSerializer } from 'jest-emotion';

expect.addSnapshotSerializer(createSerializer(emotion));

it('Input renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Input value={1} placeholder="test" />
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
