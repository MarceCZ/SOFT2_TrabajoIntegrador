import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

const Fila = ({ data }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {data.nombre}
      </TableCell>
      <TableCell align="right">{data.marca}</TableCell>
      <TableCell align="right">{data.precio}</TableCell>
      <TableCell align="right">{data.descripcion}</TableCell>
      <TableCell align="right">{data.contraindicaciones}</TableCell>
      <TableCell align="right">{data.advertencias}</TableCell>
      <TableCell align="right">{data.presentacion}</TableCell>
      <TableCell align="right">{data.stock}</TableCell>
      <TableCell align="right"><Checkbox checked={data.requiere_receta} disabled /></TableCell>
      <TableCell align="right">
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Fila;