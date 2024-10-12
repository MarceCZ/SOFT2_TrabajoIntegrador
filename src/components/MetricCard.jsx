import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MetricCard = ({ title, icon: Icon, value, unit }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#ffffff' }}>
      <Icon sx={{ fontSize: 50, color: '#4caf50', marginRight: '20px' }} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {value.toLocaleString()} {unit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;