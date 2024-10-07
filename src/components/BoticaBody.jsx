import BoticaCardList from "./BoticaCardList"
import {Box} from "@mui/material"

const BoticaBody = (props) => {
    return (
        <Box>
            <BoticaCardList list={props.boticasData}/>
        </Box>
    )
}

export default BoticaBody