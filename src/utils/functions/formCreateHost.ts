"use server";

// Service
import { getData } from "@/services/server/FetchApi";

// Tipagem
import { HostData } from "@/types/host";

export async function createHost(data: HostData) {
  const fieldNames: Record<string, string> = {
    host: "nome da máquina",
    processor: "processador",
    ram_memory: "memória RAM",
    hdd: "HDD",
    ssd: "SSD",
    storage: "armazenamento",
    system: "sistema",
    switch_network: "rede switch",
    user_id: "usuário",
  };

  for (const key in data) {
    if (
      data[key as keyof HostData] === "" ||
      data[key as keyof HostData] === null
    ) {
      return {
        error: true,
        message: `${
          fieldNames[key as keyof HostData]
        }: esse campo é obrigatório`,
      };
    }
  }

  // Faz a requisição POST após a validação dos campos
  const response = await getData("/create/host", "POST", 0, data);

  return {
    error: false,
    message: "Máquina criada com sucesso",
  };
}
