import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

function Deposits({ title, number, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {icon && React.cloneElement(icon, {style: { fontSize: '4rem', marginRight: '8px' }})}
      <div>
        <Title>{title}</Title>
        <Typography component="p" variant="h4">
          {number}
        </Typography>
      </div>
    </div>
  );
}

export default Deposits;
