"use server";

import { getData } from "@/services/server/FetchApi";

export async function createHost(formData: FormData) {
  let loading = true;

  const machineName = formData.get("machineName");
  const processor = formData.get("processor");
  const ramMemory = formData.get("ramMemory");
  const hdd = formData.get("hdd");
  const ssd = formData.get("ssd");
  const storage = formData.get("storage");
  const system = formData.get("system");
  const switchNetwork = formData.get("switchNetwork");
  const user = formData.get("user");

  const hddBoolean = hdd === "true" ? true : hdd === "false" ? false : "";
  const ssdBoolean = ssd === "true" ? true : ssd === "false" ? false : "";

  const data: Record<string, FormDataEntryValue | boolean | string | null> = {
    host: machineName,
    processor: processor,
    ram_memory: ramMemory,
    hdd: hddBoolean,
    ssd: ssdBoolean,
    storage: storage,
    system: system,
    switch_network: switchNetwork,
    user_id: user,
  };

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
    if (data[key] === "" || data[key] === null) {
      loading = false;
      return {
        loading,
        error: true,
        message: `${fieldNames[key]}: esse campo é obrigatório`,
      };
    }
  }

  // Faz a requisição POST após a validação dos campos
  const response = await getData("/create/host", "POST", 0, data);

  loading = false;
  return {
    loading,
    error: false,
    message: "Máquina criada com sucesso",
  };
}
