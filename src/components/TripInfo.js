import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Flex from './primitives/Flex';
import Typography from './primitives/Typograpgy';
import Avatar from './primitives/Avatar';
import Box from './primitives/Box';
import Grid from './primitives/Grid';
import Button from './primitives/Button';
import { startTrip, resetTrip } from '../redux/actions';
import {
  currentStationSelector,
  nextStationSelector,
  driverSelector,
  bookingsSelector,
  tripStatusSelector,
  tripStartDateSelector
} from '../redux/selectors';
import { tripStatuses } from '../constants';
import { stations } from '../data';
import { getFormattedDate } from './helpers';

const LINE_START = stations[0].name;
const LINE_END = stations[stations.length - 1].name;

const CAR_MODEL = 'Car Model';
const CAR_PLATE = 'Plate';

const TRIP_DISTANCE = 47;
const TRIP_FARE = 45;
const TRIP_FARE_CURRENCY = 'EGP';

export default function TripInfo({ ...props }) {
  const dispatch = useDispatch();

  const currentStation = useSelector(currentStationSelector);
  const nextStation = useSelector(nextStationSelector);
  const { name: driverName, img: driverImg } = useSelector(driverSelector);
  const bookings = useSelector(bookingsSelector);
  const tripStatus = useSelector(tripStatusSelector);
  const tripStartDate = useSelector(tripStartDateSelector);

  const isTripStarted = tripStatus === tripStatuses.started;
  const isTripEnded = tripStatus === tripStatuses.ended;

  const hasBookings = !!bookings && bookings.length > 0;
  const canStartTrip = hasBookings && !isTripStarted;

  function handleStartTripClick() {
    dispatch(startTrip(new Date()));
  }

  function handlResetTripClick() {
    const shouldReset = window.confirm('This action will reset everything');

    if (shouldReset) {
      dispatch(resetTrip());
    }
  }

  const DATE_TIME = getFormattedDate(tripStartDate);

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
        <Flex dir="col">
          <Typography as="h1" variant="heading1">
            Trip Information
          </Typography>
          <Typography as="h2" variant="subheading" mt={1}>
            {DATE_TIME}
          </Typography>
        </Flex>
        {isTripEnded ? (
          <Button
            backgroundColor="primary"
            color="white"
            borderColor="white"
            onClick={handlResetTripClick}
          >
            Reset
          </Button>
        ) : (
          <Button
            backgroundColor="primary"
            color="white"
            borderColor="white"
            onClick={handleStartTripClick}
            disabled={!canStartTrip}
          >
            {isTripStarted ? 'Started' : 'Start trip'}
          </Button>
        )}
      </Flex>
      <Grid
        gridColumnGap={5}
        gridRowGap={4}
        gridTemplateColumns={{ xs: 'minMax(280px,1fr)', md: '1fr 1fr 1fr' }}
        mt={4}
      >
        {/* Car and driver info */}
        <Flex alignItems="center">
          <Avatar mr={2} src={driverImg} />
          <Flex dir="col">
            <Typography capitalize variant="heading3">
              {driverName}
            </Typography>
            <Typography capitalize>
              {CAR_MODEL} - {CAR_PLATE}
            </Typography>
          </Flex>
        </Flex>

        {/* Line info */}
        <Flex alignItems="center">
          <Box
            background="linear-gradient( 45deg,#691b9c, #e60e64)"
            width={2}
            height="37px"
            borderRadius="5px"
            mr={2}
          />
          <Flex dir="col" height="98%" justifyContent="space-between">
            <Typography capitalize variant="heading3">
              {LINE_START}
            </Typography>
            <Typography capitalize variant="heading3">
              {LINE_END}
            </Typography>
          </Flex>
        </Flex>

        {/* Distance & fare */}
        <Flex dir="col" justifyContent="space-between">
          <Flex alignItems="center">
            <Box
              height={{ xs: 5, md: 8 }}
              width={4}
              backgroundColor="grey"
              borderRadius={4}
              mr={2}
            />
            <Typography>Trip Distance: {TRIP_DISTANCE} KM</Typography>
          </Flex>
          <Flex alignItems="center">
            <Box
              height={{ xs: 5, md: 8 }}
              width={4}
              backgroundColor="grey"
              borderRadius={4}
              mr={2}
            />

            <Typography>
              Trip Base Fare: {TRIP_FARE} {TRIP_FARE_CURRENCY}
            </Typography>
          </Flex>
        </Flex>

        <Flex dir="col">
          <Typography variant="heading3">
            {!!currentStation
              ? isTripStarted
                ? 'Boarding Station:'
                : 'Current Station: '
              : !!nextStation
              ? 'En route to: '
              : ''}
          </Typography>
          <Typography>
            {!!currentStation
              ? currentStation.name
              : !!nextStation
              ? nextStation.name
              : ''}
          </Typography>
        </Flex>
      </Grid>
    </Flex>
  );
}
