import BoticaCard from "./BoticaCard"
import Grid from "@mui/material/Grid"

const BoticaCardList = (props) => {
  return (
    <Grid 
      container
      sx={{ marginBottom: '25px', justifyContent: {xs:"center"}}}>
      {
        props.list.map((e) => {
            return (
                <BoticaCard 
                  id={e.id}
                  nombre={e.nombre}
                  logo={e.logo}
                  path={e.path}
                  cantidad_productos={e.cantidad_productos}
                    />
            )
        })
      }
    </Grid>
  )
}

export default BoticaCardList