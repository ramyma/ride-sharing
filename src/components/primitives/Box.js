import PropTypes from 'prop-types';
import styled, { css, down } from '@xstyled/emotion';
import {
  backgrounds,
  basics,
  borders,
  breakpoints,
  color,
  flexboxes,
  grids,
  layout,
  positioning,
  shadows,
  space
} from '@xstyled/system';

const Box = styled.div`
  ${backgrounds}
  ${basics}
  ${borders}
  ${color}
  ${flexboxes}
  ${grids}
  ${layout}
  ${positioning}
  ${shadows}
 

  ${props =>
    props.grid &&
    down(
      'xl',
      css`
        max-width: 100%;
      `
    )}
  ${props =>
    props.grid &&
    breakpoints({
      xl: css`
        max-width: ${props.theme.breakpoints.xl};
      `
    })}
  ${props =>
    props.grid &&
    css`
      margin: 0 auto;
      padding: 0 4;
    `}
    ${props =>
      props.clickable &&
      css`
        cursor: pointer;
        &:disabled {
          cursor: not-allowed;
        }
      `}
  ${space}
`;

Box.defaultProps = {
  backgroundColor: 'background'
};

Box.protoTypes = {
  grid: PropTypes.bool
};

export default Box;
