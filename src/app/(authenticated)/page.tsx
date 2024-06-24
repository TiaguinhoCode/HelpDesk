"use client";

// Framwork / Servidor
import { Session } from "next-auth";

// Componentes

// Biblioteca
import { toast } from "react-toastify";

// Tipagem
interface sessionType extends Session {
  name: string;
}

export default function Home() {
  toast.success('Bem vindo!', { icon: <span>🚀</span> })
  return (
    <>

    </>
  );
}
