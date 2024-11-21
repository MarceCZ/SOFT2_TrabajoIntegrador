import React from "react";
import { Grid, Typography } from "@mui/material";

const UserInfo = ({ userData }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Nombre(s)
                </Typography>
                <Typography variant="body1">{userData.nombre}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Apellido(s)
                </Typography>
                <Typography variant="body1">
                    {userData.apellido1} {userData.apellido2}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Correo Electrónico
                </Typography>
                <Typography variant="body1">{userData.email}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Celular
                </Typography>
                <Typography variant="body1">{userData.celular}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Número de Identidad (DNI)
                </Typography>
                <Typography variant="body1">{userData.dni}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Dirección
                </Typography>
                <Typography variant="body1">{userData.direccion}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Distrito
                </Typography>
                <Typography variant="body1">{userData.distrito}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    Referencias
                </Typography>
                <Typography variant="body1">{userData.referencias}</Typography>
            </Grid>
        </Grid>
    );
};

export default UserInfo;
