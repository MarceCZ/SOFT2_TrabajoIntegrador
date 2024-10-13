import BusinessHeader from '../components/BusinessHeader';
import { Container, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TablaProductos from '../components/ProductTable/TablaProducto';
import { useState } from 'react';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import FormDialog from '../components/FormDialog';
import { useProducts } from '../hooks/useProductosBusiness';

const BusinessProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const idBotica = 1;

  const { productos, nombreBotica, deleteProduct } = useProducts(idBotica);

  const handleDeleteClick = (id) => {
    setDeleteDialogOpen(true);
    setProductId(id);
  };

  const handleDeleteConfirm = async () => {
    await deleteProduct(productId);
    setDeleteDialogOpen(false);
    setProductId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductId(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ margin: '100px auto 0' }}>
      <BusinessHeader />
      <Box
        sx={{
          backgroundColor: '#1b986e',
          height: '150px',
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          margin: '0 auto',
          borderRadius: '40px',
        }}
      >
        <Typography variant="h3" sx={{ textAlign: 'center', margin: 0 }}>
          Productos
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', margin: 0 }}>
          {nombreBotica}
        </Typography>
      </Box>
      <Container
        sx={{ display: 'flex', flexDirection: 'column', mt: '30px', mb: '50px' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '25px' }}>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{ padding: '10px 40px', backgroundColor: '#4b4b4b', borderRadius: '30px' }}
          >
            Agregar Producto
          </Button>
          <FormDialog open={open} handleClose={handleClose} idBotica={idBotica} />
        </Box>
        <TablaProductos productos={productos} onDeleteClick={handleDeleteClick} />
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </Container>
    </div>
  );
};

export default BusinessProductsPage;