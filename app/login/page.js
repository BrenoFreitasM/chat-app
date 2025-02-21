'use client';

import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { AuthContext } from "../contexts/AuthContext";


export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSingIn(data) {
    await signIn(data);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="mt-4" onSubmit={handleSubmit(handleSingIn)}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register('email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.email)}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seuemail@email.com"
            />
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium">Senha</label>
            <input
              {...register('password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-bold transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
