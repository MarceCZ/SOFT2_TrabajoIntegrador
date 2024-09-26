import ProductoCard from "./ProductoCard"
import Grid from "@mui/material/Grid"

const ProductoCardList = (props) => {
  return (
    <Grid 
      container
      sx={{ marginBottom: '25px', justifyContent: {xs:"center"}}}>
      {
        props.list.map((e) => {
            return (
                <ProductoCard 
                  id={e.id}
                  nombre={e.nombre}
                  marca={e.marca}
                  presentacion={e.presentacion}
                  descripcion={e.descripcion}
                  contraindicaciones= {e.contraindicaciones}
                  advertencias={e.advertencias}
                  imagen= {e.imagen}
                  botica= {e.botica}
                  precio={e.precio}
                    />
            )
        })
      }
    </Grid>
  )
}

export default ProductoCardList