import Header from '../components/Header';
import productosData from '../data/data.json';
import { Container } from '@mui/material';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const BusinessMainPage = () => {

  function createData(name,stock,descripcion) {
    return { name, stock, descripcion };
  }

  const rows = [
    createData('Paracetamol', 159, 'descripcion'),
    createData('Ibuprofeno', 237, 'descripcion'),
    createData('Pastilla', 262, 'descripcion'),
    createData('Cupcake', 305, 'descripcion'),
    createData('Gingerbread', 356, 'descripcion'),
  ];

  return (
    <div>
      <Header></Header>
      <Container sx={{display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px'}}>
      <h1 style={{ textAlign: "center" }}>Mifarma</h1>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Descripción&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.stock}</TableCell>
              <TableCell align="right">{row.descripcion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </div>
  );
}

export default BusinessMainPage