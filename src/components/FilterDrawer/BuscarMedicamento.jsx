import React from 'react';
import { TextField } from '@mui/material';

const BuscarMedicamento = ({ medicamentoName, updateMedicamentoName }) => {
    return (
        <TextField
            label="Buscar Medicamento"
            variant="outlined"
            value={medicamentoName}
            onChange={(e) => updateMedicamentoName(e.target.value)}
            sx={{
                mt: 1,
                mb: 2,
                '& label.Mui-focused': {
                    color: '#1b986e',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#1b986e',
                    },
                    '&:hover fieldset': {
                        borderColor: '#1b986e',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1b986e',
                    },
                },
            }}
        />
    );
};

export default BuscarMedicamento;
