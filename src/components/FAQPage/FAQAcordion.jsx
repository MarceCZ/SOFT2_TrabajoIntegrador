import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQAccordion = ({ faqData, selectedIndex, handleListItemClick }) => {
  return (
    <>
      {faqData.map((faq, index) => (
        <Accordion
          key={index}
          expanded={selectedIndex === index}
          onChange={() => handleListItemClick(index)}
          sx={{
            maxWidth: '100%',
            margin: '10px auto',
            backgroundColor: '#fff', // Fondo blanco para todo el acordeón
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: selectedIndex === index ? '#fff' : '#000' }} />}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
            sx={{
              backgroundColor: selectedIndex === index ? '#1b986e' : 'transparent', // Fondo verde solo en el título
              color: selectedIndex === index ? '#fff' : '#000', // Texto blanco si está seleccionado
              borderRadius: '8px 8px 0 0', // Bordes redondeados solo en la parte superior
              padding: '10px 20px', // Espaciado para el título
              '&:hover': { backgroundColor: '#1b986e', color: '#fff' }, // Efecto hover
            }}
          >
            <Typography sx={{ fontWeight: 'bold', paddingLeft: 1 }}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
              sx={{
                textAlign: 'justify',
                padding: '2px 40px 2px 10px',
                borderRadius: '8px',
              }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}

export default FAQAccordion
