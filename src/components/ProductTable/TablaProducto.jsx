import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import Fila from './FilaTablaProducto'; 

const TablaProductos = ({ productos, onDeleteClick, onEditStockClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ '& th': { fontWeight: 'bold' } }}>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Marca</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Descripción</TableCell>
            <TableCell align="right">Contraindicaciones</TableCell>
            <TableCell align="right">Advertencias</TableCell>
            <TableCell align="right">Presentación</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Receta</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos?.map((producto) => (
            <Fila key={producto.name} data={producto} onDeleteClick={onDeleteClick}  onEditStockClick={onEditStockClick}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaProductos;
