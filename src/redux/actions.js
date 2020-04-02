import { bookingStatuses } from '../constants';

const action = (type, payload) => ({ type, ...payload });

export const setPathStep = pathStep => action('SET_PATH_STEP', { pathStep });

export const setStation = (currentStation, nextStation) =>
  action('SET_STATION', { currentStation, nextStation });

export const addBooking = booking =>
  action('ADD_BOOKING', { booking: { name: 'Name', ...booking } });

export const startTrip = startDate => action('START_TRIP', { startDate });

export const resetTrip = booking => action('RESET_TRIP');

export const endTrip = booking => action('END_TRIP');

export const boardBooking = (id, status) =>
  action('BOARD_BOOKING', {
    id,
    status:
      status ||
      [bookingStatuses.boarded, bookingStatuses.missed][
        Math.round(Math.random() > 0.8) //80% of boarding vs missing the trip
      ]
  });

export const dropoffBooking = id => action('DROPOFF_BOOKING', { id });
