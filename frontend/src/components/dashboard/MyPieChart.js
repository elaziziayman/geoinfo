import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import TitleChart from './TitleChart';

const size = {
  width: 400,
  height: 200,
};

export default function MyPieChart({ title, data }) {
  // Calculate the total sum of values
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div>
      <TitleChart>{title}</TitleChart>
      <PieChart
        series={[
          {
            arcLabel: (item) =>
              `${Math.round((item.value / total) * 100)}%`,
            arcLabelMinAngle: 45,
            data,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
            fontSize: 17,
          },
        }}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 17,
            },
          },
        }}
        {...size}
      />
    </div>
  );
}
