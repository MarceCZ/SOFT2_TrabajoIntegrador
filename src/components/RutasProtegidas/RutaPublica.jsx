import React from "react";
import { Navigate } from "react-router-dom";

const RutaPublica = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("userId");
    const isBotica = localStorage.getItem("isBotica") === "true";

    if (isAuthenticated) {
        return isBotica ? <Navigate to="/productsbusiness" replace /> : <Navigate to="/" replace />;
    }

    return children; 
};

export default RutaPublica;
