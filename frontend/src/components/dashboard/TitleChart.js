import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function TitleChart(props) {
  return (
    <Typography
      component="h2"
      variant="h4"  
      color="primary"
      align="center" 
      sx={{ marginTop: '10px' }} 
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}

TitleChart.propTypes = {
  children: PropTypes.node,
};

export default TitleChart;
