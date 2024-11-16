import React, { createContext,  useContext,useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userId"));
    const [isBotica, setIsBotica] = useState(localStorage.getItem("isBotica") === "true");

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const boticaStatus = localStorage.getItem('isBotica') === "true";
        setIsAuthenticated(!!userId);
        setIsBotica(boticaStatus);
        
    }, []);

    const login = (userId, isBoticaStatus) => {
        localStorage.setItem('userId', userId);
        localStorage.setItem('isBotica', isBoticaStatus);
        setIsAuthenticated(true);
        setIsBotica(isBoticaStatus);
    };

    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
