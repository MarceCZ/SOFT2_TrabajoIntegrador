import React, { createContext,  useContext,useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userId"));

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setIsAuthenticated(!!userId);
    }, []);

    const login = (userId) => {
        localStorage.setItem('userId', userId);
        setIsAuthenticated(true);
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
