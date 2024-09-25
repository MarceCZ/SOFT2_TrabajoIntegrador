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
                    descripcion={e.descripcion}
                    />
            )
        })
      }
    </Grid>
  )
}

export default ProductoCardList