import React, { useEffect, useState } from "react";
import { Container, Box, Avatar, Divider, Button, Typography } from "@mui/material";
import Header from "../components/Header";
import usuarioApi from "../api/usuario";
import clienteApi from "../api/cliente";
import { useAuth } from "../components/AuthContext";
import UserInfo from "../components/MiPerfilPage/UserInfo";
import EditUserInfo from "../components/MiPerfilPage/EditUserInfo";
import { useNavigate } from "react-router-dom";

const MiPerfil = () => {
    const { isAuthenticated } = useAuth();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem("userId");
    const navigate = useNavigate(); // Hook de navegación
    console.log("userId desde localStorage:", userId);

    useEffect(() => {
        if (!isAuthenticated || !userId) {
            setError("No tienes permisos para ver esta página.");
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                setLoading(true);
                const data = await usuarioApi.findOneComplete(userId); 
                setUserData(data);
            } catch (error) {
                setError("Error al cargar los datos del usuario.");
                console.error("Error al obtener los datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [isAuthenticated, userId]);

    const handleSave = async (updatedData) => {
        try {
            setLoading(true);
            console.log("Datos enviados para actualizar:", updatedData);
            console.log("userId desde localStorage:", userId);
            console.log("id del cliente:", userData.id)
            await clienteApi.update(updatedData.id, updatedData); 
            const refreshedData = await usuarioApi.findOneComplete(userId);
            console.log("Datos actualizados desde el backend:", refreshedData);
            setUserData(refreshedData);
            setIsEditing(false);
        } catch (error) {
            console.error("Error al actualizar los datos del cliente:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <Container>
                    <Typography variant="h5">Cargando datos del perfil...</Typography>
                </Container>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <Container>
                    <Typography variant="h5" color="error">
                        {error}
                    </Typography>
                </Container>
            </>
        );
    }

    return (
        <>
            <Header />
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(media.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                }}
            />
            <Container
                maxWidth="lg"
                sx={{
                    mt: 12,
                    mb: 5,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    boxShadow: 2,
                    padding: { xs: 4, sm: 6, md: 10 },
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "#1b986e", width: 64, height: 64 }}>
                            {userData.nombre.charAt(0)}
                        </Avatar>
                        <Typography
                            variant="h5"
                            sx={{ ml: 2, fontWeight: "bold", color: "#333" }}
                        >
                            Mi perfil
                        </Typography>
                    </Box>
                    {!isEditing && (
                        <Button
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                color: "#1b986e",
                                borderColor: "#1b986e",
                                ":hover": {
                                    borderColor: "#1b986e",
                                    backgroundColor: "#e8f5e9",
                                },
                            }}
                            onClick={() => setIsEditing(true)}
                        >
                            Editar perfil
                        </Button>
                    )}
                </Box>
                <Divider sx={{ mb: 4 }} />
                {isEditing ? (
                    <EditUserInfo userData={userData} onSave={handleSave} onCancel={() => setIsEditing(false)} />
                ) : (
                    <UserInfo userData={userData} />
                )}
                
                
            </Container>
        </>
    );
};

export default MiPerfil;
