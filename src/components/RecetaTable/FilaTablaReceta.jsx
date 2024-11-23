import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Fila = ({ data}) => {

  const productos = data.kit_productos?.map((kit_producto) => kit_producto.producto.nombre).join(', ');

  return (
    <TableRow key={data.id} >
      <TableCell component="th" scope="row">
        {data.kit_productos[0].idKit}
      </TableCell>
      <TableCell align="right">{data.id}</TableCell>
      <TableCell align="right">{data.cliente.nombre}</TableCell>
      <TableCell align="right">{productos}</TableCell>
    <TableCell align="right">
      <a href={data.imagen.startsWith('http') ? data.imagen : `http://${data.imagen}`} target="_blank" rel="noopener noreferrer" >Ver</a>
    </TableCell>
    </TableRow>
  );
};

export default Fila;