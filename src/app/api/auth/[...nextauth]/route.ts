// Bibliotecas
import axios from "axios"

// Framework / Servidor
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const api = axios.create({
    baseURL: "https://helpdeskapi.vercel.app/",
    headers: {
        'Content-Type': 'application/json'
    }
})

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials, req) {
                try {
                    const resp = await api.post('/session', {
                        email: credentials?.email,
                        password: credentials?.password
                    })

                    if (resp.data && resp.data.user) {
                        return resp.data.user
                    }

                    return null
                } catch (err) {
                    console.log("Error: ", err)
                    return null
                }
            },
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }) {
            session = token.user as any
            return session
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }