import styled, { css } from '@xstyled/emotion';
import Box from './Box';

const Input = styled(Box)``;

Input.defaultProps = {
  as: 'input',
  backgroundColor: 'background',
  border: '1px solid',
  borderRadius: 4,
  color: 'inverseBackground',
  height: 'fit-content',
  borderColor: 'inverseBackground',
  p: 2,
  minWidth: 100
};

export default Input;
