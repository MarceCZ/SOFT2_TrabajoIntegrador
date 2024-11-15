import { useState, useEffect } from "react";
import { TextField, Button, Typography, Alert, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const RecuperaNuevaForm = ({ onLogin, errorMessage }) => {
    const [correo, setCorreo] = useState("");
    const [codigo, setCodigo] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(false);
    const [errormsg, setErrormsg] = useState("");

    const mensajesError = {
        emailVacio: "El campo de correo electrónico está vacío.",
        emailInvalido: "El correo electrónico no es válido.",
        codigoVacio: "El campo de código está vacío.",
        passwordVacia: "El campo de contraseña está vacío.",
        passwordCorta: "La contraseña debe tener al menos 8 caracteres.",
        passwordNoCoincide: "Las contraseñas no coinciden.",
    };

    const getErrorValidacion = () => {
        const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if (correo.trim().length === 0) {
            return mensajesError.emailVacio;
        }
        if (!emailRegex.test(correo.trim())) {
            return mensajesError.emailInvalido;
        }
        if (codigo.trim().length === 0) {
            return mensajesError.codigoVacio;
        }
        if (password1.trim().length === 0 || password2.trim().length === 0) {
            return mensajesError.passwordVacia;
        }
        if (password1.trim().length < 8) {
            return mensajesError.passwordCorta;
        }
        if (password1 !== password2) {
            return mensajesError.passwordNoCoincide;
        }
        return null;
    };

    const handleSubmit = async () => {
        setError(false);
        setErrormsg("");

        const validacionError = getErrorValidacion();
        if (validacionError) {
            setError(true);
            setErrormsg(validacionError);
            return;
        }
        try {
            await onLogin(correo, codigo, password1);
        } catch (error) {
            setError(true);
            setErrormsg(error.message);
        }
    };

    useEffect(() => {
        if (errorMessage) {
            setError(true);
            setErrormsg(errorMessage);
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
                    Revisa tu correo, ingresa el códgo indicado y crea tu nueva contraseña.
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
                <TextField
                    label="Código"
                    placeholder="Ejemplo: 123abc"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <TextField
                    label="Nueva contraseña"
                    placeholder="Su contraseña debe tener mínimo 8 dígitos"
                    variant="outlined"
                    fullWidth
                    type="password"
                    sx={{ marginBottom: 2 }}
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                />
                <TextField
                    label="Confirmar nueva contraseña"
                    placeholder="Las contraseñas deben coincidir"
                    variant="outlined"
                    fullWidth
                    type="password"
                    sx={{ marginBottom: 2 }}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
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
                    Confirmar cambio
                </Button>
                
                <Typography
                    component={Link}
                    to="/login"
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
                    ¿No deseas cambiar tu contraseña? Ingresa ahora
                </Typography>
            </form>
            {error && (
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

export default RecuperaNuevaForm;