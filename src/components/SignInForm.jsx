import { useState, useEffect } from "react";
import { TextField, Button, Typography, Alert, Box, Grid} from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const SignInForm = ({ onRegister, errorMessage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido1, setApellido1] = useState("");
    const [apellido2, setApellido2] = useState("");
    const [dni, setDni] = useState("");
    const [celular, setCelular] = useState("");
    const [distrito, setDistrito] = useState("");
    const [direccion, setDireccion] = useState("");
    const [referencias, setReferencia] = useState("");
    const [error, setError] = useState(false);
    const [errormsg, setErrormsg] = useState("");

    const mensajesError = {
        emailVacio: "El campo de correo electrónico está vacío.",
        emailInvalido: "El correo electrónico no es válido.",
        passwordVacia: "El campo de contraseña está vacío.",
        passwordCorta: "La contraseña debe tener al menos 8 caracteres.",
        password2Invalido: "Las contraseñas no coinciden.",
        nombreVacio: "El campo de nombre está vacío.",
        nombreInvalido: "El nombre solo puede contener letras.",
        apellido1Vacio: "El campo de apellido paterno está vacío.",
        apellido1Invalido: "El apellido paterno solo puede contener letras.",
        apellido2Vacio: "El campo de apellido materno está vacío.",
        apellido2Invalido: "El apellido materno solo puede contener letras.",
        dniVacio: "El campo de documento de identidad está vacío.",
        dniInvalido: "El documento de identidad debe contener al menos 8 números.",
        celularVacio: "El campo de celular está vacío.",
        celularCorta: "El celular debe tener 9 números.",
        distritoVacio: "El campo de distrito está vacío.",
        direccionVacio: "El campo de dirección está vacío.",
        referenciaVacio: "El campo de referencia está vacío.",
    };

    const getErrorValidacion = () => {
        const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const soloNumerosRegex = /^[0-9]+$/;
    
        if (nombre.trim().length === 0) {
            return mensajesError.nombreVacio;
        }
        if (!soloLetrasRegex.test(nombre.trim())) {
            return mensajesError.nombreInvalido;
        }
        if (apellido1.trim().length === 0) {
            return mensajesError.apellido1Vacio;
        }
        if (!soloLetrasRegex.test(apellido1.trim())) {
            return mensajesError.apellido1Invalido;
        }
        if (apellido2.trim().length === 0) {
            return mensajesError.apellido2Vacio;
        }
        if (!soloLetrasRegex.test(apellido2.trim())) {
            return mensajesError.apellido2Invalido;
        }
        if (dni.trim().length === 0) {
            return mensajesError.dniVacio;
        }
        if (!soloNumerosRegex.test(dni.trim()) || dni.trim().length < 8) {
            return mensajesError.dniInvalido;
        }
        if (celular.trim().length === 0) {
            return mensajesError.celularVacio;
        }
        if (!soloNumerosRegex.test(celular.trim()) || celular.trim().length !== 9) {
            return mensajesError.celularCorta;
        }
        if (email.trim().length === 0) {
            return mensajesError.emailVacio;
        }
        if (!emailRegex.test(email.trim())) {
            return mensajesError.emailInvalido;
        }
        if (password.trim().length === 0) {
            return mensajesError.passwordVacia;
        }
        if (password.trim().length < 8) {
            return mensajesError.passwordCorta;
        }
        if (password !== password2) {
            return mensajesError.password2Invalido;
        }
        if (distrito.trim().length === 0) {
            return mensajesError.distritoVacio;
        }
        if (referencias.trim().length === 0) {
            return mensajesError.referenciaVacio;
        }
        if (direccion.trim().length === 0) {
            return mensajesError.direccionVacio;
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
    
        const userData = {
            nombre,
            apellido1,
            apellido2,
            direccion,
            distrito,
            referencias,
            dni,
            celular,
            email,
            password
        };
    
        try {
            await onRegister(userData); // Llama a la función de registro pasada como prop
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
         <Grid container spacing={1} sx={{ mt: 0}}>
          <Grid item xs={12}>
          <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
                    label="Apellido Paterno"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    value={apellido1}
                    onChange={(e) => setApellido1(e.target.value)}
                />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
                    label="Apellido Materno"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    value={apellido2}
                    onChange={(e) => setApellido2(e.target.value)}
                />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
                    label="Documento de identidad"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
                    label="Celular"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
                    label="Distrito"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    value={distrito}
                    onChange={(e) => setDistrito(e.target.value)}
                />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
                    label="Referencia"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    value={referencias}
                    onChange={(e) => setReferencia(e.target.value)}
                />
          </Grid>
          <Grid item xs={12}>
          <TextField
                    label="Dirección"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />
          </Grid>
          <Grid item xs={12}>
          <TextField
                    label="Correo electrónico"
                    placeholder="ejemplo@correo.com"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
          <TextField
                    label="Confirmar contraseña"
                    placeholder="Sus contraseñas deben coincidir"
                    variant="outlined"
                    fullWidth
                    type="password"
                    sx={{ marginBottom: 2 }}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
          </Grid>
          <Grid item xs={12}>
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
                    Crear cuenta
                </Button>
                <Typography
                    component={Link}
                    to="/login"
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
                    ¿Ya tienes una cuenta? Inicia sesión
                </Typography>
                </Grid>
        </Grid>

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

export default SignInForm;