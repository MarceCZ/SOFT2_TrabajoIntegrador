import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const Fila = ({ data }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {data.nombre}
      </TableCell>
      <TableCell align="right">{data.marca}</TableCell>
      <TableCell align="right">{data.precio}</TableCell>
      <TableCell align="right">{data.descripcion}</TableCell>
      <TableCell align="right">{data.contraindiciones}</TableCell>
      <TableCell align="right">{data.advertencias}</TableCell>
      <TableCell align="right">{data.presentacion}</TableCell>
      <TableCell align="right">{data.stock}</TableCell>
      <TableCell align="right">{data.requiere_receta}</TableCell>
    </TableRow>
  );
};

export default Fila;