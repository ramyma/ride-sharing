import React from 'react';
import { Global } from '@emotion/core';
import { css, useTheme } from '@xstyled/emotion';
import TripInfo from './components/TripInfo';
import Header from './components/Header';
import Map from './components/Map';
import Bookings from './components/bookings/Bookings';
import { useSelector } from 'react-redux';
import { bookingsSelector, tripStatusSelector } from './redux/selectors';
import Flex from './components/primitives/Flex';
import Charts from './components/charts/Charts';
import { tripStatuses } from './constants';

function App() {
  const bookings = useSelector(bookingsSelector);
  const tripStatus = useSelector(tripStatusSelector);

  const {
    colors: { background, inverseBackground },
  } = useTheme();

  return (
    <>
      <Global
        styles={css`
          body,
          html {
            margin: 0 auto;
            height: 100%;
            width: 100%;
          }

          body {
            background: ${background};
            color: ${inverseBackground};
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          select {
            border-color: ${inverseBackground};
            font-size: 16px;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          p {
            margin: 0;
          }

          #root {
            height: 100%;
            width: 100%;
          }
        `}
      />
      <Header />
      <Map />

      <Flex dir="col" grid pb={6}>
        <TripInfo mt={5} />
        <Bookings mt={5} mb={5} bookings={bookings} />
        {tripStatus === tripStatuses.ended && <Charts />}
      </Flex>
    </>
  );
}

export default App;
