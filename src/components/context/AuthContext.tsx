import React, { createContext, useContext, useEffect, useState } from 'react';
import type {AuthResponse, AuthTokenResponsePassword, User} from '@supabase/supabase-js';
import { supabase } from "../../supabase.ts";
import {useNavigate} from "react-router-dom";

interface UserData {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<AuthTokenResponsePassword>;
    signup: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserData | null>(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null);
            setLoading(false);
        });
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const signup = (email: string, password: string) =>
        supabase.auth.signUp({ email, password });

    const login = (email: string, password: string) =>
        supabase.auth.signInWithPassword({ email, password });

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
            setUser(null);
        }
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
