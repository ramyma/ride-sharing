import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { typography, variant } from '@xstyled/system';
import { css } from '@xstyled/emotion';
import Box from './Box';

const Typography = styled(Box)`
  ${variant({
    default: 'body',
    variants: {
      heading1: css`
        color: text;
        font-size: 5;
      `,
      heading2: css`
        color: text;
        font-size: 4;
        font-weight: 600;
      `,
      heading3: css`
        color: text;
        font-size: 3;
        font-weight: 600;
      `,
      subheading: css`
        color: grey;
        font-size: 3;
      `,
      body: css`
        color: text;
        font-size: 2;
      `
    }
  })}

  ${props =>
    props.capitalize &&
    css`
      text-transform: capitalize;
    `}

    ${props =>
      props.shadow &&
      css`
        text-shadow: text;
      `}
  
  ${typography}
`;

Typography.defaultProps = {
  as: 'p'
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    'heading1',
    'heading2',
    'heading3',
    'subheading',
    'body'
  ])
};

export default Typography;
