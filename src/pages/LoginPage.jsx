import React, { useState } from "react";
import { Container, Typography, CircularProgress, Backdrop, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import Header from "../components/Header";
import usuarioApi from '../api/usuario';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // obtener url desde los parámetros
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect") || "/arma-tu-kit"; // redigir

    const handleLogin = async (correo, password) => {
        setLoading(true);
        setLoginError("");

        try {
            const data = await usuarioApi.login(correo, password);

            if (data && data.id) {
                console.log("Login exitoso:", data.id);
                localStorage.setItem("userId", data.id);
                //preguntar si es botica para el acceso a sus páginas
                const isBotica = correo.includes("@mediplan.com");
                localStorage.setItem("isBotica", isBotica);

                if (isBotica) {
                    navigate("/productsbusiness");
                } else {
                    navigate(redirectPath);
                }

            } else {
                console.error("Error en el login:", data.message);
                setLoginError(data.message || "Error de autenticación.");
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
                        Iniciar sesión
                    </Typography>
                    <LoginForm onLogin={handleLogin} errorMessage={loginError} />
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

export default LoginPage
