'use client';

import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit } = useForm();
  const { signUp } = useContext(AuthContext); // Changed to signUp

  const router = useRouter();

  async function handleSignUp(data) { // Changed function name
    try {
      //await signUp(data); // Call the signUp function from the context
      console.log(data);
      await axios.post('http://localhost:4000/api/users/create', {
        name: data.name,
        email: data.email,
        password: data.password
      });


      // Redirect or show a success message after successful registration
      alert("Registration successful!"); // Or use a more sophisticated notification

      setTimeout(
        router.push('/login'),
        5000
      )

    } catch (error) {
      // Handle registration errors (e.g., display error message)
      console.error("Registration error:", error);
      alert("Registration failed. Please check your information."); // Or a more user-friendly message
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md"> {/* Added padding */}
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2> {/* Changed title and added margin */}
        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}> {/* Added spacing between form elements */}
          <div>
            <label className="block text-sm font-medium mb-1">Usuário</label> {/* Added margin bottom */}
            <input
              {...register('name')} // Changed to 'name'
              type="text" // Changed to 'text'
              value={name}
              onChange={(e) => setName(e.target.value)} // Corrected onChange
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              required // Added required attribute
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="youremail@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              {...register('password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
              required
              minLength={6} // Added minimum length for password
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded text-white font-bold transition"
          >
            Cadastre-se
          </button>
        </form>
      </div>
    </div>
  );
}