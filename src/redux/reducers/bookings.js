import produce from 'immer';
import { bookingStatuses } from '../../constants';

const INITIAL_STATE = [];
// [...Array(5).keys()].map((_, idx) => ({
//   id: `${idx + 1}`,
//   name: `Name ${idx + 1}`,
//   status: 'Checked in',
//   pickupStation: `Station 1`,
//   dropoffStation: 'Station 5',
//   payment: 'Cash'
// }));
const bookings = produce((draft = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_BOOKING':
      draft.push(action.booking);
      break;
    case 'BOARD_BOOKING':
      {
        const bookingIdx = draft.findIndex(({ id }) => id === action.id);
        if (bookingIdx !== -1) {
          draft[bookingIdx].status = action.status;
        }
      }
      break;

    case 'DROPOFF_BOOKING':
      const bookingIdx = draft.findIndex(({ id }) => id === action.id);
      if (bookingIdx !== -1) {
        draft[bookingIdx].status = bookingStatuses.completed;
      }

      break;
    case 'RESET_TRIP':
      return INITIAL_STATE;
    default:
      return draft;
  }
});

export default bookings;
