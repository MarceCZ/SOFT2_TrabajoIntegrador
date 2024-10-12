import ProductoCard from "./ProductoCard";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CustomCarousel = (props) => {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1024 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1280, min: 800 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 950, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 650, min: 0 },
          items: 1
        }
      };

    return (
        <Box sx={{ justifyContent: 'center', ml: '10%', mr: '9%' }}>
            <Carousel
                responsive={responsive}
                infinite={props.infinite}
                autoPlay={props.autoPlay}
            >
                {props.list.map((e) => (
                    <div key={e.id}>
                        <ProductoCard
                            id={e.id}
                            nombre={e.nombre}
                            marca={e.marca}
                            presentacion={e.presentacion}
                            descripcion={e.descripcion}
                            contraindicaciones={e.contraindicaciones}
                            advertencias={e.advertencias}
                            imagen={e.imagen}
                            botica={e.botica}
                            precio={e.precio}
                        />
                    </div>
                ))}
            </Carousel>
        </Box>
    )
}

export default CustomCarousel