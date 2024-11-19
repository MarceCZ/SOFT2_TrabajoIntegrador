import React, { useState } from 'react';
import { Grid, Typography, List, ListItem, IconButton, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 

import faqData from '../data/faq.json';  

const FAQPageBody = () => {
  const [selectedIndex, setSelectedIndex] = useState(null); // Ninguna pregunta seleccionada al inicio

  const handleListItemClick = (index) => {
    // Si la pregunta seleccionada es la misma que la que ya estaba seleccionada, se deselecciona
    if (selectedIndex === index) {
      setSelectedIndex(null); // Deseleccionar
    } else {
      setSelectedIndex(index); // Seleccionar la nueva pregunta
    }
  };

  return (
    <Box sx={{ margin: { xs: '8vh 0vh', lg: '10vh 30vh 0vh 30vh' } }}> 
      <Grid container sx={{ height: '89vh' }} spacing={2}>
        {/* Sidebar izquierdo */}
        <Grid item xs={12} sm={4} lg={3.5} sx={{ padding: 2, borderRight: '1px solid #ddd', display: { xs: 'none', lg: 'block' } }}>
          <List>
            {faqData.map((faq, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleListItemClick(index)}
                sx={{
                  backgroundColor: selectedIndex === index ? '#1b986e' : 'transparent', 
                  marginBottom: '10px',
                  borderRadius: '4px',
                  padding: '10px',
                  '&:hover': { backgroundColor: '#1b986e' } 
                }}
              >
                <Typography>{faq.question}</Typography>
                <IconButton sx={{ marginLeft: 'auto' }}>
                  <ExpandMoreIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Acordeón para pantallas pequeñas y medianas */}
        <Grid item xs={12} sm={8} md={8} lg={8.5} sx={{ padding: 2, backgroundColor: '#ffffff' }}>
          <Box sx={{ display: { xs: 'block', sm: 'block', lg: 'none' } }}>
            {/* Mostrar acordeón solo en pantallas xs, sm y md */}
            {faqData.map((faq, index) => (
              <Accordion key={index} expanded={selectedIndex === index} onChange={() => handleListItemClick(index)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${index}-content`}
                  id={`panel-${index}-header`}
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Si una pregunta es seleccionada, mostrar la respuesta */}
          {selectedIndex === null ? (
            // Si no hay pregunta seleccionada
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                padding: { xs: ' 0px 20px', sm: ' 0px 40px' },
                textAlign: 'center',
                mt: 4
              }}>
                <Typography 
                  variant="h4" 
                  sx={{
                    marginBottom: 3, 
                    fontWeight: 'bold', 
                    color: '#333',
                    fontSize: { xs: '2rem', sm: '2.5rem' }
                  }}
                >
                  ¡Bienvenido a la sección de Preguntas Frecuentes!
                </Typography>
              
                <Typography 
                  variant="body1" 
                  sx={{ 
                    marginBottom: 3, 
                    fontSize: { xs: '1.2rem', sm: '1.3rem' }, 
                    color: '#666'
                  }}
                >
                  Aquí podrás encontrar respuestas a las preguntas más comunes. Si no encuentras lo que buscas, no dudes en contactarnos.
                </Typography>
              
                <Typography 
                  variant="body1" 
                  sx={{
                    marginBottom: 4, 
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    color: '#666'
                  }}
                >
                  Si necesitas más ayuda, te ofrecemos diferentes formas de contacto:
                </Typography>
              
                <Box sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '10px',
                  padding: '20px',
                  width: '100%',
                  maxWidth: '500px'
                }}>
                  <Typography variant="body2" sx={{ marginBottom: 2, color: '#333' }}>
                    <strong>📞 Teléfono:</strong> +1234567890
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2, color: '#333' }}>
                    <strong>📱  WhatsApp:</strong> +1234567890
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333' }}>
                    <strong>📧  Correo electrónico:</strong> mediplan@mediplan.com
                  </Typography>
                </Box>
              
                <Typography variant="body2" sx={{ marginTop: 4, fontSize: '0.9rem', color: '#999' }}>
                  Nuestro equipo estará encantado de ayudarte. ¡No dudes en ponerte en contacto con nosotros!
                </Typography>
              </Box>              
          ) : (
            // Si hay una pregunta seleccionada
            <>
              <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', mb: 6, mt: 2, textAlign: 'justify' }}>
                {faqData[selectedIndex]?.question}
              </Typography>
              <Typography variant="body1" 
                dangerouslySetInnerHTML={{ __html: faqData[selectedIndex]?.answer }}
                sx={{textAlign: 'justify'}} />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FAQPageBody;
