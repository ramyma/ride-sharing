import produce from 'immer';
import { paymentMethods } from '../../constants';

export function getStatusByStationData(bookings, stations) {
  const dataWithCount = bookings.reduce((data, booking) => {
    const {
      pickupStation: pickupStationId,
      dropoffStation: dropoffStationId
    } = booking;
    const dataWithPickupCount = produce(data, draft => {
      if (!draft[pickupStationId]) {
        draft[pickupStationId] = {
          station: String(pickupStationId + 1),
          pickups: 0,
          dropoffs: 0
        };
      }

      draft[pickupStationId].pickups += 1;
    });

    const dataWithDropoffCount = produce(dataWithPickupCount, draft => {
      if (!draft[dropoffStationId]) {
        draft[dropoffStationId] = {
          station: String(dropoffStationId + 1),
          pickups: 0,
          dropoffs: 0
        };
      }

      draft[dropoffStationId].dropoffs += 1;
    });

    return dataWithDropoffCount;
  }, []);

  return Object.values(dataWithCount);
}

export function getStatusChartData(bookings) {
  const counts = produce(
    {
      completed: {
        id: 'completed',
        label: 'Completed',
        value: 0
      },
      missed: {
        id: 'missed',
        label: 'Missed',
        value: 0
      }
    },
    draft => {
      bookings.forEach(({ status }) => {
        if (draft[status]) {
          draft[status].value += 1;
        }
      });
    }
  );

  return Object.values(counts);
}

export function getPaymentMethodChartData(bookings) {
  return bookings.reduce(
    (data, { payment }) => {
      return produce(data, draft => {
        const idx = payment === paymentMethods.cash ? 0 : 1;
        draft[idx].value += 1;
      });
    },
    [
      {
        id: 'cash',
        label: 'Cash',
        value: 0
      },
      {
        id: 'credit',
        label: 'Credit',
        value: 0
      }
    ]
  );
}
