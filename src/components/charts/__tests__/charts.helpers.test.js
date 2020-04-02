import {
  getStatusChartData,
  getPaymentMethodChartData
} from '../charts.helpers';
import { paymentMethods } from '../../../constants';

const BOOKINGS = [
  {
    name: 'Leni Huijben',
    id: 1585823855032,
    img: 'https://randomuser.me/api/portraits/thumb/women/51.jpg',
    pickupStation: 0,
    dropoffStation: 2,
    payment: paymentMethods.cash,
    status: 'missed'
  },
  {
    name: 'Daniel Suomi',
    id: 1585823859248,
    img: 'https://randomuser.me/api/portraits/thumb/men/91.jpg',
    pickupStation: 0,
    dropoffStation: 3,
    payment: paymentMethods.cash,
    status: 'completed'
  },
  {
    name: 'Metin Van Welij',
    id: 1585823864351,
    img: 'https://randomuser.me/api/portraits/thumb/men/7.jpg',
    pickupStation: 1,
    dropoffStation: 4,
    payment: paymentMethods.cash,
    status: 'completed'
  },
  {
    name: 'Jadie Stijf',
    id: 1585823871103,
    img: 'https://randomuser.me/api/portraits/thumb/women/96.jpg',
    pickupStation: 4,
    dropoffStation: 8,
    payment: paymentMethods.cash,
    status: 'completed'
  },
  {
    name: 'فاطمه زهرا نجاتی',
    id: 1585823876255,
    img: 'https://randomuser.me/api/portraits/thumb/women/62.jpg',
    pickupStation: 2,
    dropoffStation: 9,
    payment: paymentMethods.cash,
    status: 'completed'
  },
  {
    name: 'Silver Kloek',
    id: 1585823882959,
    img: 'https://randomuser.me/api/portraits/thumb/women/75.jpg',
    pickupStation: 3,
    dropoffStation: 9,
    payment: paymentMethods.credit,
    status: 'completed'
  },
  {
    name: 'Nicolas Gonzalez',
    id: 1585823889175,
    img: 'https://randomuser.me/api/portraits/thumb/men/72.jpg',
    pickupStation: 4,
    dropoffStation: 9,
    payment: paymentMethods.cash,
    status: 'completed'
  },
  {
    name: 'Stephen Knight',
    id: 1585823897207,
    img: 'https://randomuser.me/api/portraits/thumb/men/16.jpg',
    pickupStation: 1,
    dropoffStation: 8,
    payment: paymentMethods.cash,
    status: 'completed'
  },
  {
    name: 'Daisy Rice',
    id: 1585823904670,
    img: 'https://randomuser.me/api/portraits/thumb/women/6.jpg',
    pickupStation: 8,
    dropoffStation: 9,
    payment: paymentMethods.cash,
    status: 'completed'
  },
  {
    name: 'Glicéria Monteiro',
    id: 1585823915118,
    img: 'https://randomuser.me/api/portraits/thumb/women/10.jpg',
    pickupStation: 3,
    dropoffStation: 9,
    payment: paymentMethods.credit,
    status: 'completed'
  },
  {
    name: 'Elena Rojas',
    id: 1585823927878,
    img: 'https://randomuser.me/api/portraits/thumb/women/59.jpg',
    pickupStation: 1,
    dropoffStation: 8,
    payment: paymentMethods.cash,
    status: 'completed'
  },
  {
    name: 'Alisa Berthelsen',
    id: 1585823938286,
    img: 'https://randomuser.me/api/portraits/thumb/women/72.jpg',
    pickupStation: 6,
    dropoffStation: 9,
    payment: paymentMethods.credit,
    status: 'completed'
  }
];

describe('Test Charts helper functions', () => {
  it('Should return booking statuses count for missed, cancelled and completed bookings using passed bookings', () => {
    const counts = getStatusChartData(BOOKINGS);
    expect(counts).toEqual([
      { id: 'completed', label: 'Completed', value: 11 },
      { id: 'missed', label: 'Missed', value: 1 }
    ]);
  });

  it('Should return booking payment methods data', () => {
    const counts = getPaymentMethodChartData(BOOKINGS);
    expect(counts).toEqual([
      { id: 'cash', label: 'Cash', value: 9 },
      { id: 'credit', label: 'Credit', value: 3 }
    ]);
  });
});
