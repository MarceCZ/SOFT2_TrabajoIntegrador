import React, { useContext, useEffect, useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { FilterContext } from '../FilterContext';
import apiProd from '../../api/producto';

const MarcaFilter = () => {
    const { marcaName, updateMarcaName } = useContext(FilterContext);
    const [marcasDisponibles, setMarcasDisponibles] = useState([]);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const data = await apiProd.findAllComplete();

                // Filtrar y extraer solo las marcas únicas
                const uniqueMarcas = [
                    ...new Set(data.map((producto) => producto.marca)), // Usamos producto.marca, que es un string
                ];

                setMarcasDisponibles(uniqueMarcas); // Guardar las marcas únicas disponibles
            } catch (err) {
                console.error("Error al obtener las marcas", err);
            }
        };

        fetchMarcas();
    }, []);

    const handleMarcaChange = (event) => {
        const { value, checked } = event.target;
        updateMarcaName(value, checked);
    };

    return (
        <>
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>Marca:</Typography>
            <FormGroup>
                {marcasDisponibles.map((marca, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={marcaName.includes(marca)}  // Aseguramos que marca es un string
                                onChange={handleMarcaChange}
                                value={marca} // Marca debe ser un string, no un objeto
                                sx={{
                                    color: '#1b986e',
                                    '&.Mui-checked': {
                                        color: '#1b986e',
                                    },
                                }}
                            />
                        }
                        label={marca}  // Solo pasamos el nombre de la marca
                        sx={{ typography: 'body2', textAlign: 'left' }}
                    />
                ))}
            </FormGroup>
        </>
    );
};

export default MarcaFilter;