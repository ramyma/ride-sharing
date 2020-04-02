import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Modal from '../Modal';

test('Test Modal', async () => {
  const handleClose = jest.fn();

  const { getByText } = render(
    <Modal onClose={handleClose}>
      <div>test</div>
    </Modal>
  );

  expect(getByText('test')).toBeTruthy();
});
