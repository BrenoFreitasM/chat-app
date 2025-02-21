'use client'
import { createContext, useState } from "react";
import { setCookie } from 'nookies';
import Router from "next/router";
import axios from "axios";

export const AuthContext = createContext({});


export function AuthProvider({ children }) {
    const [user, setUser] = useState("");

    const isAuthenticated = !!user;

    async function signIn(data) {

        const response = await axios.post('http://localhost:4000/api/auth/login', {
            email: data.email, // 'seu_email', // Substitua pelo email do usuário
            password: data.password // 'sua_senha' // Substitua pela senha do usuário
        });

        if (response.status === 200) {
            // Login bem-sucedido
            console.log('Login bem-sucedido:', response.data);

            // // Armazene o token JWT (exemplo)
            // localStorage.setItem('token', response.data.token);

            setCookie(undefined, 'nextauth.token', response?.data?.token, {
                maxAge: 60 * 60 * 1, // 1 hour
            });

            // Redirecione para a página desejada
            window.location.href = '/chat';

            // setUser(data.email);
            // Router.push('/chat');

        } else {
            // Erro no login
            console.error('Erro no login:', response.data.message);
        }

    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}