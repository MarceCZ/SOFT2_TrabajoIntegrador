import React from 'react';
import { List, ListItem, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQSidebar = ({ faqData, selectedIndex, handleListItemClick }) => {
  return (
    <List>
      {faqData.map((faq, index) => (
        <ListItem
          button
          key={index}
          onClick={() => handleListItemClick(index)}
          sx={{
            backgroundColor: selectedIndex === index ? '#1b986e' : 'transparent',
            color: selectedIndex === index ? '#fff' : '#000',
            marginBottom: '2px',
            borderRadius: '4px',
            padding: '10px',
            '&:hover': { backgroundColor: '#1b986e', color: '#fff' },
          }}
        >
          <Typography>{faq.question}</Typography>
          <IconButton sx={{ marginLeft: 'auto', color: selectedIndex === index ? '#fff' : '#000' }}>
            <ExpandMoreIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  )
}

export default FAQSidebar
