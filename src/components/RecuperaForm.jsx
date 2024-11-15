import { useState, useEffect } from "react";
import { TextField, Button, Typography, Alert, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const RecuperaForm = ({ onRequestReset, errorMessage }) => {
    const [correo, setCorreo] = useState("");
    const [error, setError] = useState(false);
    const [errormsg, setErrormsg] = useState("");

    const mensajesError = {
        emailVacio: "El campo de correo electrónico está vacío.",
        emailInvalido: "El correo electrónico no es válido.",
    };

    const getErrorValidacion = () => {
        const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if (correo.trim().length === 0) {
            return mensajesError.emailVacio;
        }
        if (!emailRegex.test(correo.trim())) {
            return mensajesError.emailInvalido;
        }
    };

    const handleSubmit = async () => {
        setError(false);
        setErrormsg("");

        const validacionError = getErrorValidacion();
        console.log("Validación del correo:", validacionError);
        if (validacionError) {
            setError(true);
            setErrormsg(validacionError);
            return;
        }

        
        await onRequestReset(correo);
    };

    useEffect(() => {
        console.log("Prop errorMessage recibido:", errorMessage);
        if (errorMessage) {
            setError(true);
            setErrormsg(errorMessage);
        } else {
            setError(false); 
            setErrormsg("");
        }
    }, [errorMessage]);

    return (
        <Box sx={{ width: "100%", maxWidth: 400 }}>
            <form>
                <Typography
                    to="/recuperar"
                    sx={{
                        display: "block",
                        textAlign: "center",
                        marginBottom: 2,
                        fontSize: 14,
                        color: "#333",
                        textDecoration: "none",
                    }}
                >
                    Enviaremos un correo a la dirección ingresada con indicaciones para restablecer tu correo.
                </Typography>
                <TextField
                    label="Correo electrónico"
                    placeholder="ejemplo@correo.com"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        marginTop: 2,
                        backgroundColor: "#1b986e",
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "bold",
                        '&:hover': {
                            backgroundColor: "#0d694a",
                        },
                    }}
                    onClick={handleSubmit}
                >
                    Enviar correo
                </Button>
                
                <Typography
                    component={Link}
                    to="/registro"
                    sx={{
                        display: "block",
                        textAlign: "center",
                        marginTop: 3,
                        fontSize: 14,
                        color: "#1b986e",
                        textDecoration: "none",
                        '&:hover': {
                            textDecoration: "underline",
                        },
                    }}
                >
                    ¿Aún no tienes una cuenta? Regístrate
                </Typography>
            </form>
            {error && errormsg &&(
                <Alert
                    icon={<ErrorOutlineIcon fontSize="inherit" />}
                    severity="error"
                    sx={{ mt: 2 }}
                    onClose={() => setError(false)}
                >
                    {errormsg}
                </Alert>
            )}
        </Box>
    );
};

export default RecuperaForm;