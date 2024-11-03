import { Container, Typography, CircularProgress, Backdrop, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import Header from '../components/Header';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (correo, password) => {
        setLoading(true);
        setLoginError("");

        try {
            const response = await fetch('http://localhost:3001/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: correo, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login exitoso:", data);
                setLoading(false);
                navigate("/arma-tu-kit");
            } else {
                console.error("Error en el login:", data.message);
                setLoading(false);
                setLoginError(data.message || "Error de autenticación.");
            }
        } catch (error) {
            console.error("Error de conexión:", error.message);
            setLoading(false);
            setLoginError(error.message);
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
                    backgroundColor: "#F5F5F5"
                }}>

                <Box
                    sx={{
                        width: "50%",
                        backgroundImage: "url(media.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100vh",
                        display: { xs: "none", md: "block" }
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
    );
};

export default LoginPage;
