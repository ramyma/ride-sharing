import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

function Avatar({ src, ...props }) {
  return (
    <Box
      as="img"
      {...(!src && { backgroundColor: 'inverseBackground' })}
      borderRadius="50%"
      width={45}
      height={45}
      src={src}
      {...props}
    ></Box>
  );
}
Avatar.propTypes = {
  src: PropTypes.string
};
export default Avatar;
