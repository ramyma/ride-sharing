import React, { useState } from 'react';
import Flex from '../primitives/Flex';
import Typography from '../primitives/Typograpgy';
import Grid from '../primitives/Grid';
import Button from '../primitives/Button';
import Badge from '../primitives/Badge';
import Booking from './Booking';
import AddBookingModal from './AddBookingModal';
import { TRIP_MAX_BOOKINGS, tripStatuses } from '../../constants';
import { useSelector } from 'react-redux';
import { tripStatusSelector } from '../../redux/selectors';

export default function Bookings({ bookings, ...props }) {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const tripStatus = useSelector(tripStatusSelector);

  function handleAddBookingClick() {
    setIsAddModalVisible(true);
  }

  function handleBookingModalClose() {
    setIsAddModalVisible(false);
  }

  const isTripStarted = tripStatus === tripStatuses.started;

  const hasBookings = !!bookings && !!bookings.length;
  const isAddBookingDisabled =
    isTripStarted || (bookings && bookings.length === TRIP_MAX_BOOKINGS);
  const isAddBookingAvailable = tripStatus !== tripStatuses.ended;

  return (
    <Flex as="section" dir="col" {...props}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        py={2}
        position="sticky"
        top={0}
      >
        <Flex alignItems="center">
          <Typography as="h1" variant="heading1">
            Bookings
          </Typography>
          {hasBookings && <Badge ml={2}> {bookings.length} </Badge>}
        </Flex>
        {isAddBookingAvailable && (
          <Button
            disabled={isAddBookingDisabled}
            onClick={handleAddBookingClick}
          >
            Add Booking
          </Button>
        )}
      </Flex>
      {hasBookings ? (
        <Grid
          as="section"
          gridTemplateColumns="repeat(auto-fill,minMax(210px,1fr))"
          gridGap={4}
        >
          {bookings.map(
            ({
              id,
              img,
              name,
              pickupStation,
              dropoffStation,
              status,
              payment
            }) => (
              <Booking
                key={id}
                {...{
                  id,
                  img,
                  name,
                  pickupStation,
                  dropoffStation,
                  status,
                  payment
                }}
              />
            )
          )}
        </Grid>
      ) : (
        <Typography variant="body">
          No bookings added yet. Press <b>Add Booking</b> to get started.
        </Typography>
      )}
      {isAddModalVisible && (
        <AddBookingModal onClose={handleBookingModalClose} />
      )}
    </Flex>
  );
}
