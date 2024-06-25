// Biblioteca
import axios from "axios";

// Servidor
import { getSession } from "next-auth/react";
import { Session } from "inspector";

// Tipagem
import { CustomSession } from "@/types/session-auth";


export const setupApiClient = () => {
    const instance = axios.create({
        baseURL: "https://helpdeskapi.vercel.app/",
        headers: {
            'Content-Type': 'application/json',
        }
    })

    instance.interceptors.request.use(async (config) => {
        const session = await getSession() as CustomSession;

        if (session) {
            config.headers.Authorization = `Bearer ${session.token}`;
        }

        return config
    }, (err) => {
        return Promise.reject(err)
    })

    return instance
}