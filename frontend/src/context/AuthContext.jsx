// global login state
import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, logoutApi, meApi, registerApi } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);      // { userId }
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState("");

    const fetchMe = async () => {
        try {
            const res = await meApi();
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    const register = async (email, password) => {
        setAuthError("");
        await registerApi({ email, password });
    };

    const login = async (email, password) => {
        setAuthError("");
        try {
            await loginApi({ email, password });
            await fetchMe();
        } catch (e) {
            setAuthError(e?.response?.data?.message || "Login failed");
            throw e;
        }
    };

    const logout = async () => {
        setAuthError("");
        await logoutApi();
        setUser(null);
    };

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, loading, authError, register, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
