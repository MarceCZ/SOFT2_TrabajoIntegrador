import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Alert } from "@mui/material";

const EditUserInfo = ({ userData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ ...userData });
    const [error, setError] = useState(false);
    const [errormsg, setErrormsg] = useState("");

    const mensajesError = {
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
        const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const soloNumerosRegex = /^[0-9]+$/;

        if (formData.nombre.trim().length === 0) {
            return mensajesError.nombreVacio;
        }
        if (!soloLetrasRegex.test(formData.nombre.trim())) {
            return mensajesError.nombreInvalido;
        }
        if (formData.apellido1.trim().length === 0) {
            return mensajesError.apellido1Vacio;
        }
        if (!soloLetrasRegex.test(formData.apellido1.trim())) {
            return mensajesError.apellido1Invalido;
        }
        if (formData.apellido2.trim().length === 0) {
            return mensajesError.apellido2Vacio;
        }
        if (!soloLetrasRegex.test(formData.apellido2.trim())) {
            return mensajesError.apellido2Invalido;
        }
        if (formData.dni.trim().length === 0) {
            return mensajesError.dniVacio;
        }
        if (!soloNumerosRegex.test(formData.dni.trim()) || formData.dni.trim().length < 8) {
            return mensajesError.dniInvalido;
        }
        if (formData.celular.trim().length === 0) {
            return mensajesError.celularVacio;
        }
        if (!soloNumerosRegex.test(formData.celular.trim()) || formData.celular.trim().length !== 9) {
            return mensajesError.celularCorta;
        }
        if (formData.distrito.trim().length === 0) {
            return mensajesError.distritoVacio;
        }
        if (formData.referencias.trim().length === 0) {
            return mensajesError.referenciaVacio;
        }
        if (formData.direccion.trim().length === 0) {
            return mensajesError.direccionVacio;
        }
        return null;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const validacionError = getErrorValidacion();
        if (validacionError) {
            setError(true);
            setErrormsg(validacionError);
            return;
        }
        setError(false);
        setErrormsg("");
        onSave(formData);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Nombre(s)
                </Typography>
                <TextField
                    fullWidth
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Apellidos
                </Typography>
                <TextField
                    fullWidth
                    name="apellido1"
                    value={formData.apellido1}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    name="apellido2"
                    value={formData.apellido2}
                    onChange={handleChange}
                    sx={{ mt: 1 }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Correo Electrónico
                </Typography>
                <TextField fullWidth value={formData.email} disabled />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Celular
                </Typography>
                <TextField
                    fullWidth
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Número de Identidad (DNI)
                </Typography>
                <TextField
                    fullWidth
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Dirección
                </Typography>
                <TextField
                    fullWidth
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Distrito
                </Typography>
                <TextField
                    fullWidth
                    name="distrito"
                    value={formData.distrito}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Referencias
                </Typography>
                <TextField
                    fullWidth
                    name="referencias"
                    value={formData.referencias}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#1b986e",
                        color: "#fff",
                        ":hover": {
                            backgroundColor: "#176e58",
                        },
                    }}
                    onClick={handleSave}
                >
                    Guardar
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        color: "#000",
                        borderColor: "#000",
                        ":hover": {
                            borderColor: "#000",
                            backgroundColor: "#f0f0f0",
                        },
                    }}
                    onClick={onCancel}
                >
                    Cancelar
                </Button>
            </Grid>

            {error && (
                <Grid item xs={12}>
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {errormsg}
                    </Alert>
                </Grid>
            )}
        </Grid>
    );
};

export default EditUserInfo;
