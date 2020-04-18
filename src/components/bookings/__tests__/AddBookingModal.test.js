import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';
import React from 'react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import AddBookingModal from '../AddBookingModal';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../../redux/reducers/rootReducer';
import { paymentMethods, bookingStatuses } from '../../../constants';
import { addBooking } from '../../../redux/actions';

jest.mock('../../../data/users');
Date.now = jest.fn(() => 1482363367071);
const dispatch = jest.fn();

afterAll(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.resetAllMocks();
});

function renderWithRedux(
  ui,
  {
    initialState,
    store = { ...createStore(rootReducer, initialState), dispatch },
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

test('Test AddBookingModal', async () => {
  const onClose = jest.fn();
  const { getByLabelText, getByText } = renderWithRedux(
    <AddBookingModal onClose={onClose} />
  );

  const pickupStation = getByLabelText('Pickup Station:');
  const dropOffStation = getByLabelText('Dropoff Station:');

  expect(pickupStation).toHaveDisplayValue('Station 1');
  expect(dropOffStation).toHaveDisplayValue('Station 10');
  expect(pickupStation).toHaveTextContent(/Station [1-9]/);
  expect(pickupStation).not.toHaveTextContent(/Station 10/);
  expect(dropOffStation).toHaveTextContent(/Station [2-9]/);
  expect(dropOffStation).not.toHaveTextContent(/Station 1(\D)/);

  userEvent.selectOptions(pickupStation, '3');

  expect(pickupStation).toHaveDisplayValue('Station 4');
  expect(dropOffStation).toHaveDisplayValue('Station 10');
  expect(pickupStation).toHaveTextContent(/Station ([1-9])/);
  expect(pickupStation).not.toHaveTextContent(/Station 10$/);
  expect(dropOffStation).toHaveTextContent(/Station [5-9]/);
  expect(dropOffStation).not.toHaveTextContent(/Station [1-4]\D/);

  userEvent.selectOptions(dropOffStation, '4');

  expect(pickupStation).toHaveDisplayValue('Station 4');
  expect(dropOffStation).toHaveDisplayValue('Station 5');
  expect(pickupStation).toHaveTextContent(/Station ([1-4]\D)/);
  expect(pickupStation).not.toHaveTextContent(/Station (([5-9]\D)|10$)/);
  expect(dropOffStation).toHaveTextContent(/Station (([5-9]\D)|10$)/);
  expect(dropOffStation).not.toHaveTextContent(/Station [1-4]\D/);

  fireEvent.change(dropOffStation, {
    target: { value: '5' },
  });

  expect(dropOffStation.value).toBe('5');

  fireEvent.change(pickupStation, {
    target: { value: '1' },
  });

  expect(pickupStation.value).toBe('1');
  expect(dropOffStation.value).toBe('5');

  const payment = getByLabelText('Payment:');

  expect(payment).toHaveDisplayValue('Cash');

  userEvent.selectOptions(payment, paymentMethods.credit);

  expect(payment).toHaveDisplayValue('Credit');

  userEvent.selectOptions(payment, paymentMethods.cash);

  expect(payment).toHaveDisplayValue('Cash');

  const submitButton = getByText('Add');

  userEvent.click(submitButton);

  expect(dispatch).toHaveBeenCalledWith(
    addBooking({
      id: expect.anything(),
      img: expect.anything(),
      name: expect.any(String),
      pickupStation: 1,
      dropoffStation: 5,
      payment: paymentMethods.cash,
      status: bookingStatuses.pending,
    })
  );

  expect(onClose).toHaveBeenCalled();
});

test('That AddBookingModal is accessible', async () => {
  const onClose = jest.fn();
  const { getByRole } = renderWithRedux(<AddBookingModal onClose={onClose} />);

  const results = await axe(getByRole('form'));

  expect(results).toHaveNoViolations();
});
