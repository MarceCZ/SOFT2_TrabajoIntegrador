import React, { useState } from "react";
import { Container, Typography, CircularProgress, Backdrop, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import RecuperarNuevaForm from "../components/RecuperaNuevaForm.jsx";
import Header from "../components/Header.jsx";
import usuarioApi from '../api/usuario.js';
import correoApi from '../api/email.js';

const RecuperarNuevaPage = () => {
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // obtener url desde los parámetros
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect") || "/arma-tu-kit"; // redigir

    const handleLogin = async (correo, codigo, password) => {
        setLoading(true);
        setLoginError("");

        try {
            const response = await correoApi.verificarYCambiarPassword(correo, codigo, password);

            console.log("Status de la respuesta de la API:", response.status);
            console.log("Respuesta completa de la API:", response);

            if (response.status === 200) {
                console.log("Contraseña cambiada exitosamente");
                // Iniciar sesión después de cambiar la contraseña
                const loginData = await usuarioApi.login(correo, password);
                if (loginData && loginData.id) {
                    localStorage.setItem("userId", loginData.id);
                    const isBotica = correo.includes("@mediplan.com");
                    localStorage.setItem("isBotica", isBotica);
    
                    if (isBotica) {
                        navigate("/productsbusiness");
                    } else {
                        navigate(redirectPath);
                    }
                }
            } else {
                console.error("Error en el cambio de contraseña:", response.message);
                setLoginError(response.message || "Error al cambiar la contraseña.");
            }
        } catch (error) {
            console.error("Error de conexión:", error.message);
            setLoginError(error.message);
        }
        finally {
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
                        Restablece tu contraseña
                    </Typography>
                    <RecuperarNuevaForm onLogin={handleLogin} errorMessage={loginError} />
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

export default RecuperarNuevaPage
