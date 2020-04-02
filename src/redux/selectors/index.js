import { stations } from '../../data';
import { bookingStatuses } from '../../constants';

export const bookingsSelector = state => {
  return state.bookings;
};

export const tripSelector = state => {
  return state.trip;
};

export const currentStationSelector = state => {
  const { trip: { currentStation } = {} } = state;

  return Number.isInteger(currentStation)
    ? stations[currentStation]
    : undefined;
};

export const currentPathStepSelector = state => {
  const { trip: { pathStep } = {} } = state;

  return pathStep;
};

export const nextStationSelector = state => {
  const { trip: { nextStation } = {} } = state;

  return Number.isInteger(nextStation) ? stations[nextStation] : undefined;
};

export const driverSelector = state => {
  const { trip: { driver } = {} } = state;
  return driver;
};

export const tripStatusSelector = state => {
  const { trip: { status } = {} } = state;
  return status;
};

export const tripStartDateSelector = state => {
  const { trip: { startDate } = {} } = state;
  return startDate;
};

// TODO: add unit test
export const bookingWithPickupStation = state => {
  const bookings = bookingsSelector(state);
  const currentStation = currentStationSelector(state);

  return bookings.filter(
    ({ pickupStation, status }) =>
      status === bookingStatuses.pending &&
      currentStation &&
      currentStation.id === pickupStation
  );
};

// TODO: add unit test
export const bookingWithDropoffStation = state => {
  const bookings = bookingsSelector(state);
  const currentStation = currentStationSelector(state);

  return bookings.filter(
    ({ dropoffStation, status }) =>
      status === bookingStatuses.boarded &&
      currentStation &&
      currentStation.id === dropoffStation
  );
};
