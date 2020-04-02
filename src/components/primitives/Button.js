import PropTypes from 'prop-types';
import styled, { css } from '@xstyled/emotion';
import Box from './Box';

const Button = styled(Box)`
  cursor: pointer;
  user-select: none;
  font-weight: bold;

  transition: 280ms all ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  ${props =>
    !props.disabled &&
    css`
      &:hover {
        background-color: ${props.inverse
          ? props.backgroundColor
          : props.color};
        color: ${props.inverse ? props.color : props.backgroundColor};
      }
    `}

  ${props =>
    props.inverse &&
    css`
      background-color: ${props.color};
      color: ${props.backgroundColor};
    `}
`;

Button.defaultProps = {
  as: 'button',
  backgroundColor: 'background',
  border: '1px solid',
  borderRadius: 4,
  color: 'inverseBackground',
  height: 'fit-content',
  borderColor: 'inverseBackground',
  p: 2,
  minWidth: 100
};

Button.propTypes = {
  disabled: PropTypes.bool,
  inverse: PropTypes.bool
};

export default Button;
