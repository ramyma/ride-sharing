import bookings from '../bookings';
import { boardBooking, addBooking } from '../../actions';
import { paymentMethods } from '../../../constants';

let state;
describe('Test bookings reducer', () => {
  beforeEach(() => {
    state = [
      {
        name: 'Toby Thompson',
        id: 1,
        img: 'https://randomuser.me/api/portraits/thumb/men/59.jpg',
        pickupStation: 1,
        dropoffStation: 9,
        payment: paymentMethods.cash,
        status: 'pending'
      }
    ];
  });
  it('Should add passed booking', () => {
    const booking = {
      name: 'Toby Thompson',
      id: 1,
      img: 'https://randomuser.me/api/portraits/thumb/men/59.jpg',
      pickupStation: 1,
      dropoffStation: 9,
      payment: paymentMethods.cash,
      status: 'pending'
    };
    const out = bookings([], addBooking(booking));

    expect(out).toEqual([booking]);
  });

  it('Should change booking status with passed status', () => {
    const out1 = bookings(state, boardBooking(1, 'missed'));
    expect(out1[0].status).toBe('missed');

    const out2 = bookings(state, boardBooking(1, 'completed'));
    expect(out2[0].status).toBe('completed');
  });

  it('Should dropoff booking with passed id', () => {
    const out = bookings(state, boardBooking(1, 'completed'));
    expect(out[0].status).toBe('completed');
  });
});
