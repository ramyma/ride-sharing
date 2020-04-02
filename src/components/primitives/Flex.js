import PropTypes from 'prop-types';
import styled, { css } from '@xstyled/emotion';
import { variant } from '@xstyled/system';
import Box from './Box';

const Flex = styled(Box)`
  display: flex;
  ${variant({
    default: 'row',
    prop: 'dir',
    variants: {
      row: css`
        flex-direction: row;
      `,
      col: css`
        flex-direction: column;
      `
    }
  })}
`;
Flex.propTypes = {
  dir: PropTypes.oneOf(['col', 'row'])
};
export default Flex;
