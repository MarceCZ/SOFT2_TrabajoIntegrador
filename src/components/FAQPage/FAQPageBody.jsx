import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import faqData from '../../data/faq.json';
import FAQAccordion from './FAQAcordion';
import FAQSidebar from './FAQSidebar';
import FAQSelected from './FAQSelected';
import ContactInfo from './ContactInfo';

const FAQPageBody = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  const handleRedirect = () => navigate('/escribenos');

  const handleListItemClick = (index) =>
    setSelectedIndex(selectedIndex === index ? null : index);

  return (
    <Box sx={{ margin: { xs: '6vh 0', sm: '8vh 0', lg: '10vh 0' } }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4} lg={3} sx={{ padding: 1, borderRight: '1px solid #ddd', display: { xs: 'none', lg: 'block' } }}>
          <FAQSidebar faqData={faqData} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />
        </Grid>

        <Grid item xs={12} sm={8} lg={8} sx={{ padding: 2 }}>
          <Box sx={{ display: { xs: 'block', sm: 'block', lg: 'none' } }}>
            <FAQAccordion faqData={faqData} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'none', lg: 'flex' } }}>
            {selectedIndex === null ? (
              <ContactInfo onRedirect={handleRedirect} />
            ) : (
              <FAQSelected selectedIndex={selectedIndex} faqData={faqData} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FAQPageBody
