import React from 'react';
import { Box, Typography } from '@mui/material';

const FAQSelected = ({ selectedIndex, faqData }) => {
  if (selectedIndex === null) return null;

  return (
    <Box
      sx={{
        maxWidth: '800px',
        mx: 'auto',
        textAlign: 'justify',
        py: 4,
        padding: 2,
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          fontWeight: 'bold',
          mb: 6,
          mt: 2,
        }}
      >
        {faqData[selectedIndex]?.question}
      </Typography>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{ __html: faqData[selectedIndex]?.answer }}
      />
    </Box>
  )
}

export default FAQSelected
