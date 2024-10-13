import React, { useContext } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { FilterContext } from '../FilterContext';
import PriceRangeFilter from './PriceRangeFilter';
import BuscarMedicamento from './BuscarMedicamento';
import BoticaFilter from './BoticaFilter';
import MarcaFilter from './MarcaFilter';
import ResetFilters from './ResetFilter';

const FilterDrawer = ({ boticasDisponibles, marcasDisponibles }) => {
    const {
        medicamentoName,
        updateMedicamentoName,
        resetFilters,
        decodedBotica,
    } = useContext(FilterContext);

    return (
        <Grid container justifyContent="flex-start">
            <Grid>
                <Box
                    sx={{
                        padding: 1,
                        width: '90%',
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'left' }}>Filtros</Typography>

                    <BuscarMedicamento
                        medicamentoName={medicamentoName}
                        updateMedicamentoName={updateMedicamentoName}
                    />

                    <PriceRangeFilter />

                    {!decodedBotica && (
                        <BoticaFilter
                            boticasDisponibles={boticasDisponibles}
                        />
                    )}

                    <MarcaFilter
                        marcasDisponibles={marcasDisponibles}
                    />

                    <ResetFilters resetFilters={resetFilters} />
                </Box>
            </Grid>
        </Grid>
    );
};

export default FilterDrawer;
