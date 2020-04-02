import { combineReducers } from 'redux';
import { default as bookingsReducer } from './bookings';
import { default as tripReducer } from './trip';

const rootReducer = combineReducers({
  bookings: bookingsReducer,
  trip: tripReducer
});

export default rootReducer;
