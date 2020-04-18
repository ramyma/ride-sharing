import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Flex from '../primitives/Flex';
import Typography from '../primitives/Typograpgy';
import { addBooking } from '../../redux/actions';
import Button from '../primitives/Button';
import Modal from '../primitives/Modal';
import Box from '../primitives/Box';
import { stations } from '../../data';
import { useRef } from 'react';
import getRandomUser from '../../data/users';
import { bookingStatuses, paymentMethods } from '../../constants';

export default function AddBookingModal({ onClose }) {
  const dispatch = useDispatch();
  const addButtonRef = useRef();

  const [pickupStation, setPickupStation] = useState(stations[0].id);
  const [dropoffStation, setDropoffStation] = useState(
    stations[stations.length - 1].id
  );

  const [payment, setPayment] = useState(paymentMethods.cash);

  useEffect(() => {
    addButtonRef.current.focus();
  }, []);

  const filteredPickupStations = useMemo(
    () =>
      stations.filter(
        ({ id }) => id < dropoffStation && id < stations.length - 1
      ),
    [dropoffStation]
  );

  const filteredDropoffStations = useMemo(
    () => stations.filter(({ id }) => id > pickupStation),
    [pickupStation]
  );

  function handleChange(event) {
    const value = event.target.value;
    switch (event.target.name) {
      case 'pickupStation':
        setPickupStation(+value);
        break;
      case 'dropoffStation':
        setDropoffStation(+value);
        break;
      case 'payment':
        setPayment(value);
        break;
      default:
    }
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    const { name, img } = getRandomUser();
    dispatch(
      addBooking({
        id: Date.now(),
        name,
        img,
        pickupStation,
        dropoffStation,
        payment,
        status: bookingStatuses.pending,
      })
    );
    onClose();
  }
  return (
    <Modal onClose={onClose}>
      <Flex dir="col" flex={1}>
        <Typography variant="heading1">Add Booking</Typography>
        <Flex
          as="form"
          role="form"
          dir="col"
          py={2}
          flex={1}
          onSubmit={handleFormSubmit}
        >
          <Flex dir="col" py={2}>
            <Box as="label" htmlFor="pickupStation" pb={2}>
              Pickup Station:
            </Box>
            <Box
              id="pickupStation"
              as="select"
              clickable
              color="inverseBackground"
              borderRadius={4}
              p={2}
              name="pickupStation"
              value={pickupStation}
              onChange={handleChange}
            >
              {filteredPickupStations.map(({ id, name }) => (
                <Box as="option" clickable key={id} value={id}>
                  {name}
                </Box>
              ))}
            </Box>
          </Flex>
          <Flex dir="col" py={2}>
            <Box as="label" htmlFor="dropoffStation" pb={2}>
              Dropoff Station:
            </Box>
            <Box
              as="select"
              id="dropoffStation"
              clickable
              color="inverseBackground"
              borderRadius={4}
              p={2}
              name="dropoffStation"
              value={dropoffStation}
              onChange={handleChange}
            >
              {filteredDropoffStations.map(({ id, name }) => (
                <Box as="option" clickable key={id} value={id}>
                  {name}
                </Box>
              ))}
            </Box>
          </Flex>
          <Flex dir="col" py={2} mb={6}>
            <Box as="label" htmlFor="payment" pb={2}>
              Payment:
            </Box>
            <Box
              as="select"
              id="payment"
              clickable
              color="inverseBackground"
              borderRadius={4}
              p={2}
              name="payment"
              value={payment}
              onChange={handleChange}
            >
              <Box as="option" clickable value={paymentMethods.cash}>
                Cash
              </Box>
              <Box as="option" clickable value={paymentMethods.credit}>
                Credit
              </Box>
            </Box>
          </Flex>
          <Button
            backgroundColor="primary"
            color="white"
            borderColor="white"
            mt="auto"
            type="submit"
            ref={addButtonRef}
          >
            Add
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}

AddBookingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
