import ProductoCardList from "./ProductoCardList"
import {Box} from "@mui/material"

const ProductoBody = (props) => {
    return (
        <Box>
            <ProductoCardList list={props.productosData}/>
        </Box>
    )
}

export default ProductoBody