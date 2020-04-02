import React from 'react';
import Flex from '../primitives/Flex';
import Typography from '../primitives/Typograpgy';
import Avatar from '../primitives/Avatar';
import { stations } from '../../data';
import { bookingStatuses } from '../../constants';

export default function Booking({
  id,
  img,
  name,
  pickupStation,
  dropoffStation,
  status,
  payment,
  ...props
}) {
  const { name: pickupStationName } = stations[pickupStation];
  const { name: dropoffStationName } = stations[dropoffStation];
  const statusColor = getStatusColor(status);
  return (
    <Flex alignItems="start" {...props}>
      <Avatar mr={2} src={img} />
      <Flex dir="col" height="90%">
        <Typography capitalize>{name}</Typography>
        <Typography capitalize>{pickupStationName}</Typography>
        <Typography capitalize>{dropoffStationName}</Typography>
        <Typography capitalize>{payment}</Typography>
        <Typography capitalize fontWeight={600} color={statusColor}>
          {status}
        </Typography>
      </Flex>
    </Flex>
  );
}

export function getStatusColor(status) {
  switch (status) {
    case bookingStatuses.pending:
      return 'warning';
    case bookingStatuses.cancelled:
    case bookingStatuses.missed:
      return 'danger';
    case bookingStatuses.completed:
      return 'success';
    default:
      break;
  }
}
