import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Flex from './Flex';
import styled from '@emotion/styled';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);
const container = document.createElement('div');

export default function Modal({ children, onClose }) {
  const modalBodyRef = useRef();

  useEffect(() => {
    modalRoot.appendChild(container);

    return () => {
      modalRoot.removeChild(container);
    };
  }, []);

  useEffect(() => {
    function handleKeyPress(event) {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;

        default:
          break;
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  useEffect(() => {
    function onClickOutsideHandler(event) {
      if (!modalBodyRef.current.contains(event.target)) {
        onClose();
      }
    }
    window.addEventListener('click', onClickOutsideHandler);
    return () => {
      window.removeEventListener('click', onClickOutsideHandler);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <Modal.Container>
      <Modal.Body ref={modalBodyRef}>{children}</Modal.Body>
    </Modal.Container>,
    container
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};

Modal.Container = styled(Flex)`
  background: #000000ba;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
`;

Modal.Body = styled(Flex)`
  border-radius: 4px;
  border: 1px solid;
  border-color: inverseBackground;
`;

Modal.Body.defaultProps = {
  backgroundColor: 'background',
  padding: 4,
  mt: { xs: '15%', md: '8%' },
  mx: 'auto',
  minWidth: '30%',
  height: 'fit-content'
};
