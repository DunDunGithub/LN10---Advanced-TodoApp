// AuthContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


    const login = (token: string) => {
        setIsAuthenticated(true);
        // Optionally, you can save the token to localStorage or a cookie
        localStorage.setItem('token', token);
    };

    const logout = () => {
        /* logic to handle user logout */
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
