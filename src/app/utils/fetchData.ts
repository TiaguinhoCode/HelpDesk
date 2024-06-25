// Api
import { api } from "@/services/apiClient";

// React

export async function fetchData(endpoint: string, setData: (data: any) => void) {
    try {
        const resp = await api.get(endpoint);
        return setData(resp.data);
    } catch (err) {
        console.error("Erro ao buscar dados:", err);
        throw new Error("Erro ao buscar dados");
    }
}