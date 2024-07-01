import { api } from "@/services/apiServer";

export default async function fetchData(path: string) {

    try {
        const resp = await api.get(path)
        console.log("Deu certo requisicao: ", resp.data)
        return resp
    } catch (err) {
        console.log('Erro ao buscar dados:', err);
    }

}