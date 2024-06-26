// Biblioteca
import axios from "axios";

// Servidor
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "inspector";

// Tipagem
interface sessionType extends Session {
    name: string;
    email: string;
    department: { id: string, sector: string };
    token: string
    photo: string
}

export const setupApiClient = () => {
    const instance = axios.create({
        baseURL: "https://helpdeskapi.vercel.app/",
        headers: {
            'Content-Type': 'application/json',
        }
    })

    instance.interceptors.request.use(async (config) => {
        const session = await getServerSession(nextAuthOptions) as sessionType

        if (session) {
            config.headers.Authorization = `Bearer ${session.token}`;
        }

        return config
    }, (err) => {
        return Promise.reject(err)
    })

    return instance
}