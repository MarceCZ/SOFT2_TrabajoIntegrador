import React, { useContext } from 'react';
import { Dialog, Box, Typography, Grid, IconButton } from '@mui/material';
import { FilterContext } from '../FilterContext';
import CloseIcon from '@mui/icons-material/Close';
import PriceRangeFilter from './PriceRangeFilter';
import BuscarMedicamento from './BuscarMedicamento';
import BoticaFilter from './BoticaFilter';
import MarcaFilter from './MarcaFilter';
import ResetFilters from './ResetFilter';

const FilterDrawerMini = ({ isOpen, toggleDrawer, boticasDisponibles, marcasDisponibles, decodedBotica }) => {
    const {
        medicamentoName,
        updateMedicamentoName,
        resetFilters,
    } = useContext(FilterContext);

    return (
        <Dialog open={isOpen} onClose={toggleDrawer} maxWidth="sm" fullWidth>
            <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Filtros</Typography>
                    <IconButton onClick={toggleDrawer}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ mt: 2 }}>
                <BuscarMedicamento
                        medicamentoName={medicamentoName}
                        updateMedicamentoName={updateMedicamentoName}
                    />
                    <PriceRangeFilter />
                    
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {!decodedBotica && (
                            <Grid item xs={6}>
                                <BoticaFilter boticasDisponibles={boticasDisponibles} />
                            </Grid>
                        )}
                        <Grid item xs={6}>
                            <MarcaFilter marcasDisponibles={marcasDisponibles} />
                        </Grid>
                    </Grid>

                    <ResetFilters resetFilters={resetFilters} />
                </Box>
            </Box>
        </Dialog>
    );
};

export default FilterDrawerMini;
