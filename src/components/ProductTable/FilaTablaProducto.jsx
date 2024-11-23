import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Fila = ({ data, onDeleteClick, onEditStockClick }) => {

  const getStockBackgroundColor = (stock) => {
    if (stock === 0) {
      return '#ff4c4c'; // Rojo intenso (sin stock)
    } else if (stock <= 10) {
      return '#FF7F00 '; // Naranja (stock bajo)
    } else if (stock <= 25) {
      return '#ffeb3b'; // Amarillo intenso (stock medio)
    } else {
      return '#c3e6cb'; // Verde más fuerte (stock alto)
    }
  };

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
      {/*}<TableCell align="right" sx={{backgroundColor: getStockBackgroundColor(data.stock)}} >{data.stock}</TableCell>{*/}
      <TableCell align="right">
        <div
          style={{
            backgroundColor: getStockBackgroundColor(data.stock),
            padding: '2px 5px',
            borderRadius: '4px', 
          }}
        >
          {data.stock}
        </div>
      </TableCell>

      <TableCell align="right"  ><Checkbox checked={data.receta} disabled /></TableCell>
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