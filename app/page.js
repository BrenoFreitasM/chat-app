import Image from "next/image";
import { AuthProvider } from "./contexts/AuthContext";

export default function Home() {
  
  return (
    <AuthProvider>
      <span>Home</span>
    </AuthProvider>
  );
}
