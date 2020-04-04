import styled from '@xstyled/emotion';
import Typography from './Typograpgy';

const Badge = styled(Typography)``;

Badge.defaultProps = {
  backgroundColor: 'primary',
  borderRadius: 4,
  color: 'white',
  fontSize: 1,
  textAlign: 'center',
  p: 1,
  minWidth: 9
};

export default Badge;
