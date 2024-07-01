import axios from "axios";

export const setupClientAxios = (token: string) => {
    const instance = axios.create({
        baseURL: "https://helpdeskapi.vercel.app/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return instance;
};
