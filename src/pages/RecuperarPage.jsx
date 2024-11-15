import React, { useState } from "react";
import { Container, Typography, CircularProgress, Backdrop, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import RecuperaForm from "../components/RecuperaForm.jsx";
import Header from "../components/Header";
import correoApi from '../api/email.js';

const RecuperarPage = () => {
    const [loading, setLoading] = useState(false);
    const [requestError, setRequestError] = useState("");
    const navigate = useNavigate();

    const handleRequestReset = async (correo) => {
        setLoading(true);
        setRequestError("");

        try {
            const response = await correoApi.requestPasswordReset(correo);

            console.log("Status de la respuesta de la API:", response.status);
            console.log("Respuesta completa de la API:", response);

            if (response.status !== 200) {
                setRequestError(response.message);
            } else {
                console.log("Solicitud de restablecimiento enviada:", correo);
                setRequestError("");
                navigate("/restablecer");
            }
        } catch (error) {
            console.error("Error de conexión:", error.message);
            setRequestError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F5F5F5",
                }}
            >
                <Box
                    sx={{
                        width: "50%",
                        backgroundImage: "url(media.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100vh",
                        display: { xs: "none", md: "block" },
                    }}
                />

                <Box
                    sx={{
                        width: { xs: "100%", md: "50%" },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: "white",
                        padding: 4,
                        height: "100vh",
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            marginBottom: 3,
                            fontWeight: "bold",
                            color: "#333",
                        }}
                    >
                        Recupera tu contraseña
                    </Typography>
                    <RecuperaForm onRequestReset={handleRequestReset} errorMessage={requestError} />
                </Box>
            </Container>

            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default RecuperarPage
