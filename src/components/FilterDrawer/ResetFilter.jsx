import React from 'react';
import { Button } from '@mui/material';

const ResetFilter = ({ resetFilters }) => {
    return (
        <Button
            variant="outlined"
            color="secondary"
            onClick={resetFilters}
            sx={{ mt: 2, borderColor: '#1b986e', color: '#1b986e', width: '100%' }}
        >
            Resetear Filtros
        </Button>
    );
};

export default ResetFilter;
