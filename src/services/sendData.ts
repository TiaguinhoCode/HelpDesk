import { api } from "./apiClient";

interface CreateHostData {
  host: string;
  processor: string;
  ram_memory: string;
  hdd: string;
  sdd: string;
  storage: string;
  system: string;
  switch_netwoork: string;
  user_id: string;
}

export async function createHost(data: CreateHostData) {
  try {
    await api.post("/create/host", data);
    console.log("Deu certo requisição: ", data);
  } catch (error) {
    console.error("Error: ", error);
  }
}
