import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function Title(props) {
  return (
    <Typography
      component="h2"
      variant="h5"  // Adjust the variant to your desired heading size
      color="primary"
      align="center"  // Center the text
      sx={{ marginTop: '10px' }}  // Add top margin for spacing
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
