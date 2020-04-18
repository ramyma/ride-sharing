import React from 'react';
import renderer from 'react-test-renderer';
import { createSerializer } from 'jest-emotion';
import * as emotion from '@xstyled/emotion';
import { ColorModeProvider, ThemeProvider } from '@xstyled/emotion';
import App from '../App';
import theme from '../theme';
import { Provider } from 'react-redux';
import rootReducer from '../redux/reducers/rootReducer';
import { createStore } from 'redux';

expect.addSnapshotSerializer(createSerializer(emotion));
jest.mock('../components/Map', () => {
  return '';
});

afterAll(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.resetAllMocks();
});

const testDate = new Date(1482363367071);
jest.spyOn(global, 'Date').mockImplementation(() => testDate);
Date.now = jest.fn(() => 1482363367071);

jest.mock('../data/users');

it('App renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={createStore(rootReducer)}>
        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <App />
          </ColorModeProvider>
        </ThemeProvider>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
