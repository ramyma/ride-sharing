import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ColorModeProvider, ThemeProvider } from '@xstyled/emotion';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import theme from './theme';
import { store, persistor } from './redux/store';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<div></div>} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <ColorModeProvider>
              <App />
            </ColorModeProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
