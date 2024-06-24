'use client'

// React
import { ReactNode } from "react";

// Biblioteca
import { SessionProvider } from "next-auth/react";

// Tipagem
interface NextAuthSessionProviiderProps {
    children: ReactNode
}

export default function NextAuthSessionProvider({ children }: NextAuthSessionProviiderProps) {
    return <SessionProvider>{children}</SessionProvider>
}