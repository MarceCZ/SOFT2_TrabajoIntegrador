import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import Fila from './FilaTablaReceta'; 

const TablaRecetas = ({ recetas }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ '& th': { fontWeight: 'bold' } }}>
          <TableRow>
            <TableCell>Pedido</TableCell>
            <TableCell align="right">ID Receta</TableCell>
            <TableCell align="right">Cliente</TableCell>
            <TableCell align="right">Productos</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recetas?.map((receta) => (
            <Fila key={receta.id} data={receta} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaRecetas;
