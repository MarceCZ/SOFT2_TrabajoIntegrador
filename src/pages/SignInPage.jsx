import React, { useState } from "react";
import { Container, Typography, CircularProgress, Backdrop, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SignInForm from "../components/SignInForm.jsx";
import Header from "../components/Header";

const SignInPage = () => {
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Obtener URL de redirección desde los parámetros de consulta
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect") || "/arma-tu-kit"; // Ruta predeterminada

    const handleRegister = async (userData) => {
        setLoading(true);
        setRegisterError("");
    
        try {
            const response = await fetch("http://localhost:3001/usuario/signin", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log("Registro exitoso:", data);
                sessionStorage.setItem("userId", data.id);
                navigate(redirectPath);
            } else {
                console.error("Error en el registro:", data.message);
                setRegisterError(data.message || "Error al registrar usuario.");
            }
        } catch (error) {
            console.error("Error de conexión:", error.message);
            setRegisterError(error.message);
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
                            marginTop: 4,
                            marginBottom: 2,
                            fontWeight: "bold",
                            color: "#333",
                        }}
                    >
                        Regístrate
                    </Typography>
                    <SignInForm onRegister={handleRegister} errorMessage={registerError} />
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

export default SignInPage