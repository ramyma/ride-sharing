import React, { useEffect, useRef } from 'react';
import BookingStatusByStationChart from './BookingStatusByStationChart';
import BookingStatusesChart from './BookingStatusesChart';
import Flex from '../primitives/Flex';
import { useSelector } from 'react-redux';
import { bookingsSelector } from '../../redux/selectors';
import { stations } from '../../data';
import Typography from '../primitives/Typograpgy';
import {
  getStatusByStationData,
  getStatusChartData,
  getPaymentMethodChartData
} from './charts.helpers';
import BookingPaymentMethodChart from './BookingPaymentMethodChart';

export default function Charts() {
  const bookings = useSelector(bookingsSelector);
  const statusChartData = getStatusChartData(bookings);
  const statusByStationData = getStatusByStationData(bookings, stations);
  const bookingsPaymentData = getPaymentMethodChartData(bookings, stations);

  const chartsRef = useRef();

  useEffect(() => {
    try {
      window.scrollTo({
        top: chartsRef.current.getBoundingClientRect().y,
        left: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // For browsers that don't have smooth scrolling support like old safari
      window.scrollTo(0, chartsRef.current.getBoundingClientRect().y);
    }
  }, []);

  return (
    <Flex as="section" dir="col" ref={chartsRef}>
      <Typography as="h1" variant="heading1" mb={4} py={2}>
        Stats
      </Typography>
      <Flex
        dir="col"
        alignItems="center"
        borderRadius={4}
        ref={chartsRef}
        py={{ xs: 0, md: 5 }}
      >
        <BookingStatusesChart
          data={statusChartData}
          py={{ xs: 2, md: 4 }}
          width="95%"
          height={{ xs: 300, md: 500 }}
        />
        <BookingStatusByStationChart
          data={statusByStationData}
          py={{ xs: 2, md: 4 }}
          width="95%"
          height={{ xs: 260, x: 300, md: 500 }}
        />

        <BookingPaymentMethodChart
          data={bookingsPaymentData}
          py={{ xs: 2, md: 4 }}
          pb={{ xs: 6, md: 0 }}
          width="95%"
          height={{ xs: 300, md: 500 }}
        />
      </Flex>
    </Flex>
  );
}
