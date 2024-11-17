import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Fila = ({ data, onDeleteClick, onEditStockClick }) => {
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
      <TableCell align="right"><Checkbox checked={data.receta} disabled /></TableCell>
      <TableCell align="right">
          <EditIcon sx={{ color: '#1b986e' }} onClick={() =>onEditStockClick(data.id)} />
      </TableCell>
      <TableCell align="right">
          <DeleteIcon sx={{ color: '#f28b82' }} onClick={() => onDeleteClick(data.id)}/>
      </TableCell>
    </TableRow>
  );
};

export default Fila;