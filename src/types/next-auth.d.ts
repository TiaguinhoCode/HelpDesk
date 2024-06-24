import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            name: string
            email: string,
            department: {
                id: string
                sector: string
            }[]
            photo: string
        }
    }
}