'use client'
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from "next/navigation";
import axios from "axios";
import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const { token } = parseCookies();
    
    const router = useRouter();
    const isAuthenticated = !!user;


    const loadUser = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/auth/verify', {
                headers: {
                    'authorization': token
                }
            });

            console.log('--- Response auth context /verify ----')
            console.log(response)

            if ( response?.data?.valid ) {
                // setUser(response.data); // Atualiza o usuário
                setUser('teste@teste.com'); // Atualiza o usuário
            } else {
                setUser(null)
            }
           
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(async () => {
        if (token) {
            await loadUser();
        }
    }, [])


    async function signIn(data) {

        console.log('Email: ', data.email);
        console.log("Password: ", data.password)
        const response = await axios.post('http://localhost:4000/api/auth/login', {
            email: data.email, // 'seu_email', // Substitua pelo email do usuário
            password: data.password // 'sua_senha' // Substitua pela senha do usuário
        });

        console.log(response)
        if (response.status !== 200) {
            console.log('Erro no login:', response.data.message);
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }

        // Login bem-sucedido
        console.log('Login bem-sucedido:', response.data);

        // // Armazene o token JWT (exemplo)
        // localStorage.setItem('token', response.data.token);

        setCookie(undefined, 'token', response?.data?.token, {
            maxAge: 60 * 60 * 1, // 1 hour
        });

        api.defaults.headers['Authorization'] = `Bearer ${token}`
        setUser(data.email);

        // Redirecione para a página desejada
        // window.location.href = '/chat';

        router.push('/chat');

    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}