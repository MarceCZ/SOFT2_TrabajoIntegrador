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
    </TableRow>
  );
};

export default Fila;