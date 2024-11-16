import React from "react";
import { Navigate } from "react-router-dom";

const RutaProtegidaCliente = ({ children }) => {
    const isBotica = localStorage.getItem("isBotica") === "true";

    if (isBotica) {
        return <Navigate to="/productsbusiness" replace />;
    }

    return children;
};

export default RutaProtegidaCliente;
