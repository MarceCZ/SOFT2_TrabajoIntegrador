import React, { useContext, useEffect, useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { FilterContext } from '../FilterContext';
import apiProd from '../../api/producto';

const BoticaFilter = () => {
    const { boticaName, updateBoticaName } = useContext(FilterContext);
    const [boticasDisponibles, setBoticasDisponibles] = useState([]);

    // Obtener boticas del API al montar el componente
    useEffect(() => {
        const fetchBoticas = async () => {
            try {
                const data = await apiProd.findAllComplete();

                // Filtrar y extraer solo los objetos de las boticas únicas
                const uniqueBoticas = [
                    ...new Map(data.map((producto) => [producto.botica.nombre, producto.botica])).values(),
                ];

                // Guardar las boticas únicas disponibles
                setBoticasDisponibles(uniqueBoticas);
            } catch (err) {
                console.error("Error al obtener las boticas", err);
            }
        };

        fetchBoticas();
    }, []);

    const handleBoticaChange = (event) => {
        const { value, checked } = event.target;
        updateBoticaName(value, checked);
    };

    return (
        <>
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
                Botica:
            </Typography>
            <FormGroup>
                {boticasDisponibles.map((botica, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={boticaName.includes(botica.nombre)}
                                onChange={handleBoticaChange}
                                value={botica.nombre}
                                sx={{
                                    color: '#1b986e',
                                    '&.Mui-checked': {
                                        color: '#1b986e',
                                    },
                                }}
                            />
                        }
                        label={botica.nombre}
                        sx={{ typography: 'body2', textAlign: 'left' }}
                    />
                ))}
            </FormGroup>
        </>
    );
};

export default BoticaFilter;
