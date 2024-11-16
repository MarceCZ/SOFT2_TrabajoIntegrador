import React from "react";
import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
    const isBotica = localStorage.getItem("isBotica") === "true";

    if (!isBotica) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default RutaProtegida;
