import { useState, useEffect } from "react";
import { TextField, Button, Typography, Alert, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const LoginForm = ({ onLogin, errorMessage }) => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errormsg, setErrormsg] = useState("");

    const mensajesError = {
        emailVacio: "El campo de correo electrónico está vacío.",
        emailInvalido: "El correo electrónico no es válido.",
        passwordVacia: "El campo de contraseña está vacío.",
        passwordCorta: "La contraseña debe tener al menos 8 caracteres."
    };

    const getErrorValidacion = () => {
        const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if (correo.trim().length === 0) {
            return mensajesError.emailVacio;
        }
        if (!emailRegex.test(correo.trim())) {
            return mensajesError.emailInvalido;
        }
        if (password.trim().length === 0) {
            return mensajesError.passwordVacia;
        }
        if (password.trim().length < 8) {
            return mensajesError.passwordCorta;
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
            await onLogin(correo, password);
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
                    label="Contraseña"
                    placeholder="Su contraseña debe tener mínimo 8 dígitos"
                    variant="outlined"
                    fullWidth
                    type="password"
                    sx={{ marginBottom: 2 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    Inicia sesión
                </Button>
                <Typography
                    component={Link}
                    to="/recuperar"
                    sx={{
                        display: "block",
                        textAlign: "center",
                        marginTop: 2,
                        fontSize: 14,
                        color: "#1b986e",
                        textDecoration: "none",
                        '&:hover': {
                            textDecoration: "underline",
                        },
                    }}
                >
                    ¿Olvidaste tu contraseña?
                </Typography>
                <Typography
                    component={Link}
                    to="/signin"
                    sx={{
                        display: "block",
                        textAlign: "center",
                        marginTop: 1,
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

export default LoginForm;